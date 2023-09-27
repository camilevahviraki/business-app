import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getUsersList, searchUser } from '../../redux/user/getUsersListReducer';
import singularize from '../reusable/singularize/singulartze';
import SearchBar from '../reusable/serach-bar/SearchBar';
import userIcon from '../../images/user-show-icon.png'

const UserList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersList());
  }, [])

  const transformDateFormat = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const members = useSelector((state) => state.getUsersListReducer).users;

  const onSearch = (val) => {
    let data = null
    if (val === '' || !val) {
      data = '*';
    } else {
      data = val;
    }

    dispatch(searchUser(data))
  }

  return (
    <div className='page-container'>

      <div >
        <h4 className='members-title'>All Members</h4>
        <SearchBar
          onSearch={onSearch}
          instantSearch
        />
      </div>
      {
        members ? members.map((member) => {
          const {
            email,
            first_name,
            last_name,
            picture_url,
            updated_at,
            department_id,
            department,
            entity,
            id,
          } = member.data.attributes;

          return (<Link to={`../entity/x/department/${department_id}/user/${id}`} className='member-wrapper' style={{ width: '60%' }}>
            <div className='member-picture-wrapp'>
              <img src={picture_url ? picture_url : userIcon} alt='' className='member-picture' />
            </div>
            <div className='member-description'>
              <h4>{first_name}{' '}{last_name}</h4>
              <p>{email}</p>
              <p>{singularize(department.name)}{' '}at {entity.name}</p>
              <p>Since: {transformDateFormat(updated_at)}</p>
            </div>
          </Link>)
        }) : <></>
      }
    </div>
  )
}

export default UserList