import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import docIcon from '../../images/item-splash-image.png';
import { getDocument } from '../../redux/documents/showDocumentReducer';
import ReadFiles from '../reusable/readFiles/readFiles';

const ShowDocument = () => {

  const dispatch = useDispatch();
  const { department_id, id, entity_id } = useParams();

  useEffect(() => {
    dispatch(getDocument(id));
  }, []);

  const transformDateFormat = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const document = useSelector(state => state.showDocumentReducer);

  const {
    name,
    data,
    updated_at,
    entity,
    department,
  } = document;
  return (
    <div className='page-container'>
      <div className='member-description main-member-description'>
        <h4 className='member-name'>{name}</h4>
        {
          updated_at ? <p>updated on: {transformDateFormat(updated_at)}</p> : <></>
        }

      </div>

      {!data ?
        (<div className='member-picture-main-wrapp'>
          <img src={data ? data : docIcon} alt='' className='member-picture' />
        </div>
        )
        :
        <>

          {
            data.includes('.pdf') || data.includes('.PDF') ? (<ReadFiles data={data} />) : (
              <>
                <div className='member-picture-main-wrapp'>
                  <img src={data} alt='' className='member-picture' />
                </div>
              </>
            )}
        </>

      }

    </div>
  )
}

export default ShowDocument