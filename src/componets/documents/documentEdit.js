import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import FormR from '../reusable/form/FormR';
import { getDocument } from '../../redux/documents/showDocumentReducer';
import { editDocument, deleteDocumentResponse } from '../../redux/documents/createDocumentReducer';

const DocumentEdit = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getDocument(id));
  }, []);

  const document = useSelector(state => state.showDocumentReducer);

  const {
    name,
    updated_at,
    entity,
    department,
  } = document;

  const data = useSelector(state => state.authenticationReducer);
  const userData = data.user;

  const [inputErrorArr, setInputErrorArr] = useState([0, 0]);
  const response = useSelector((state) => state.createDocumentReducer).message;
  const [message, setMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const inputsArray = [
    {
      type: 'text',
      placeholder: `${name}`,
      classInput: 'user-authentication-form-input',
      label: 'name',
      name: 'document',
    },
  ];

  const newDocument = (e) => {
    e.preventDefault();
    const name = e.target.document.value;
    if (name.length === 0) {
      setMessage('Please, Enter  the name!');
      setInputErrorArr([1]);
    } else {
      setInputErrorArr([0]);
      setMessage(null);
      setLoader(true);
      dispatch(editDocument({ data: name, id, field: 'name' }));
    }
  };

  useEffect(() => {
    if (response === 'name updated successfully!') {
      setMessage(null);
      setLoader(false)
      if (userData.admin) {
        navigate(`../document/${id}`);
      } else {
        navigate('../');
      }

      dispatch(deleteDocumentResponse());

    } else if (response === 'Error uploading document!') {
      setMessage('Error uploading document!');
      dispatch(deleteDocumentResponse());
      setLoader(false)
    }
  }, [response]);


  return (
    <div className='page-container'>
      {
        name ? <FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={newDocument}
          submitButton={!loader ? 'Edit' : <FiLoader className="button-loader white-loader" />}
          submitClass="user-authentication-form-button"
          errorMessage={message}
          inputErrorArr={inputErrorArr}
          inputWrapperClassName="create-item-input-wrapper" />
          :
          <></>

      }

    </div>
  )
}

export default DocumentEdit