import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import userIcon from '../../images/user-show-icon.png'
import { getUser } from '../../redux/user/getUserReducer';
import { FiLoader } from 'react-icons/fi';
import { updatePermission, deletePermissionResponse } from '../../redux/user/updatePermissionReducer';
import singularize from '../reusable/singularize/singulartze';

const UserDetails = () => {

  const dispatch = useDispatch();
  const { department_id, id, entity_id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  const transformDateFormat = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const [loader, setLoader] = useState(false);
  const data = useSelector(state => state.getUserReducer);
  const response = useSelector((state) => state.userPermissionReducer).message;
  const userData = data.users;
  const {
    email,
    first_name,
    last_name,
    picture_url,
    permission,
    updated_at,
    department,
    entity,
  } = userData;

  const userAccess = [
    { action: 'delete', value: false },
    { action: 'add', value: false },
    { action: 'edit', value: false },
  ];

  console.log(userData)

  const changePermission = (access) => {
    if (permission.includes(access)) {
      const newPermission = permission.filter((el) => el !== access);
      dispatch(updatePermission(id, newPermission))
    } else {
      dispatch(updatePermission(id, [...permission, access]))
    }
  }

  useEffect(() => {
    if (response === 'Permissions updated successfully!') {
      dispatch(getUser(id));
      dispatch(deletePermissionResponse());
    }
  }, [response]);

  return (
    <>
      {
        userData ? (
          <div className='page-container'>
            <div className='page-wrapper'>
              <div className='member-picture-main-wrapp'>
                <img src={picture_url ? picture_url : userIcon} alt='' className='member-picture' />
              </div>
              <div className='member-description main-member-description'>
                <h4 className='member-name'>{first_name}{' '}{last_name}</h4>
                {
                  department ?
                    <p style={{ fontSize: '18px', fontWeight: '700' }}>{singularize(department.name)} at {entity.name}</p> :
                    <></>
                }
                <p>{email}</p>
                {
                  updated_at ? <p>updated on: {transformDateFormat(updated_at)}</p> : <></>
                }

                <div className='permissions-wrapper'>
                  <h4>Permissions</h4>

                  {
                    permission ? userAccess.map((access) => (
                      <div style={{ position: 'relative', margin: '3px 0' }}>
                        <span>{access.action}: </span>
                        {
                          !loader ?
                            <label class="switch" onClick={() => changePermission(access.action)}>
                              {
                                permission.includes(access.action) ?
                                  <input className='input-check' type="checkbox" checked />
                                  :
                                  <input className='input-check' type="checkbox" />
                              }

                              <span class="slider round"></span>
                            </label>
                            :
                            <button>
                              <FiLoader className="button-loader white-loader" />
                            </button>
                        }

                      </div>)) : <></>
                  }


                </div>

              </div>
            </div>

          </div>

        ) : <></>
      }
    </>
  )
}

export default UserDetails