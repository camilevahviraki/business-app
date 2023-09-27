import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../reusable/serach-bar/SearchBar';
import docIcon from '../../images/item-splash-image.png';
import adobeIcon from '../../images/adobe-icon.png';
import { getDocuments, searchDocument } from '../../redux/documents/getDocumentsListReducer';
import { deleteDocument, deleteDocumentResponse } from '../../redux/documents/createDocumentReducer';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const data = useSelector(state => state.getDocumentsReducer);
  const userData = useSelector((state) => state.authenticationReducer);
  useEffect(() => {

    if (userData.token) {
      dispatch(getDocuments(userData.user.id));
    } else {
      navigate('../login');
    }
  }, []);
  const { user } = userData;
  const documents = data;
  const response = useSelector((state) => state.createDocumentReducer).message;

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

  useEffect(() => {
    if (response === 'Document deleted successfully!') {
      dispatch(getDocuments(userData.user.id))
      dispatch(deleteDocumentResponse());
    }
  }, [response]);

  return (
    <div className='page-container'>
      <div >
        <h4 className='members-title'>All Documents</h4>
        <SearchBar
          onSearch={onSearch}
          instantSearch
        />
      </div>

      {
        user.permission && user.permission.includes('add') ?
          <Link
            className='new-department'
            to={`../entity/current/department/${user.department_id}/document/new`}
          >
            <FaPlus />{' '}New document
          </Link>
          :
          <></>
      }

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
            user_id,
          } = document;

          return (
            <div style={{ position: 'relative', width: '80%' }}>
              <Link to={`../entity/current/department/${department_id}/document/${id}`} className='member-wrapper'>
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

              </Link>
              {
                user.admin || user.permission && user.permission.includes('delete') && user.id === user_id ?
                  <FaTrash className='delete-department' onClick={() => { dispatch(deleteDocument(id)) }} />
                  : <></>
              }

            </div>
          )
        }) : <></>
      }
    </div>
  )
}

export default Home