import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import SearchBar from '../reusable/serach-bar/SearchBar';
import docIcon from '../../images/item-splash-image.png';
import adobeIcon from '../../images/adobe-icon.png';
import { getDocuments, searchDocument } from '../../redux/documents/getDocumentsListReducer';

const DocumentsList = () => {

  const dispatch = useDispatch()

  const userData = useSelector((state) => state.authenticationReducer);
  const { user } = userData;

  useEffect(() => {
    dispatch(getDocuments(user.id));
  }, []);

  const data = useSelector(state => state.getDocumentsReducer);
  const documents = data;

  const transformDateFormat = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const onSearch = (val) => {
    let data = {}
    if (val === '' || !val) {
      data = {
        id: user.id,
        query: '*'
      }
    } else {
      data = {
        id: user.id,
        query: val
      }
    }

    dispatch(searchDocument(data))
  }


  return (
    <div className='page-container'>
      <div >
        <h4 className='members-title'>All Documents</h4>
        <SearchBar
          onSearch={onSearch}
          instantSearch
        />
      </div>
      <Link
        className='new-department'
        to={`../entity/current/department/${user.department_id}/document/new`}
      >
        <FaPlus />{' '}New document
      </Link>
      {
        documents ? documents.map((document) => {
          const {
            id,
            name,
            data,
            updated_at,
            department_id,
            department,
            entity,
          } = document;

          return (<Link to={`../entity/current/department/${department_id}/document/${id}`} className='member-wrapper'>
            <div className='member-picture-wrapp'>
              {
                data ? (<>
                  {
                    data.includes('.pdf') || data.includes('.PDF') ?
                      <img src={adobeIcon} alt='' className='member-picture' />
                      :
                      <img src={data ? data : docIcon} alt='' className='member-picture' />
                  }
                </>) : (
                  <img src={docIcon} alt='' className='member-picture' />
                )
              }
            </div>
            <div className='member-description'>
              <h4>{name}</h4>
              <p>uploaded on: {transformDateFormat(updated_at)}</p>
              <p>Department: {department.name}</p>
            </div>
          </Link>)
        }) : <></>
      }
    </div>
  )
}

export default DocumentsList