import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {AiOutlineFileImage} from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import FormR from '../reusable/form/FormR';
import { createNewDocument, deleteDocumentResponse } from '../../redux/documents/createDocumentReducer';

const NewDocument = () => {

  const dispatch = useDispatch();
  const { entity_id, department_id } = useParams();
  const navigate = useNavigate();

  const data = useSelector(state => state.authenticationReducer);
  const userData = data.user;

  const [inputErrorArr, setInputErrorArr] = useState([0, 0]);
  const response = useSelector((state) => state.createDocumentReducer).message;
  const [message, setMessage] = useState(null);
  const [gallery, setItemsGallery] = useState([]);
  const [loader, setLoader] = useState(false);

  const inputsArray = [
    {
      type: 'text',
      placeholder: 'Daily Revenue',
      classInput: 'user-authentication-form-input',
      label: 'name',
      name: 'document',
    },
    {
        type: 'text',
        placeholder: 'Accounting',
        classInput: 'user-authentication-form-input',
        label: 'type',
        name: 'type',
      }
  ];

  const newDocument = (e) => {
    e.preventDefault();
    const name = e.target.document.value;
    const type = e.target.type.value;
    if (name.length === 0) {
      setMessage('Please, Enter  the name!');
      setInputErrorArr([1, 0,]);
    }else if (type.length === 0) {
        setMessage('Please, Enter  the type!');
        setInputErrorArr([0, 1,]);
      }else if (!gallery) {
        setMessage('Please, Input the document to contonue!');
        setInputErrorArr([0, 0]);
      }
     else {
      setInputErrorArr([0, 0]);
      setMessage(null);
      setLoader(true);
      dispatch(createNewDocument({name,type, department_id, data: gallery, user_id: userData.id}));
    }
  };

  useEffect(() => {
    if (response === 'Document created successfully!' || response === 'Error while saving Document!') {
      setMessage(null);
      setLoader(false)
      if(userData.admin){
        navigate(`../entity/${entity_id}/document/${department_id}`);
      }else {
        navigate('../');
      }
      
      dispatch(deleteDocumentResponse());
     
    }else if(response === 'Error uploading document!'){
      setMessage('Error uploading document!');
      dispatch(deleteDocumentResponse());
      setLoader(false)
    }
  }, [response]);

  return (
    <>
    <div className='page-container'>

      <label htmlFor="item-image" className="create-item-label-input-file">
        Select a file
        <AiOutlineFileImage className="input-file-icon" />
        <input
          id="item-image"
          type="file"
          accept="image/*,.pdf"
          className="create-item-input-file"
          onChange={(e) => {
            setItemsGallery(e.target.files[0]);
          }}
        />
      </label>
    
    <FormR
      classForm="create-item-form"
      inputsArray={inputsArray}
      submitFunction={newDocument}
      submitButton={!loader ? 'Upload' : <FiLoader className="button-loader white-loader" />}
      submitClass="user-authentication-form-button"
      errorMessage={message}
      inputErrorArr={inputErrorArr}
      inputWrapperClassName="create-item-input-wrapper"/>
  </div>
</>
  )
}

export default NewDocument