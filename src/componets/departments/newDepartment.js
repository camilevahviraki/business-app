import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import FormR from '../reusable/form/FormR';
import { createNewDepartment, deleteDepartmentResponse } from '../../redux/department/createDepartmentReducer';

const NewDepartment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputErrorArr, setInputErrorArr] = useState([0, 0]);
  const response = useSelector((state) => state.createDepartmentReducer).message;
  const [message, setMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const inputsArray = [
    {
      type: 'text',
      placeholder: 'Technicians',
      classInput: 'user-authentication-form-input',
      label: 'name',
      name: 'department',
    },
  ];

  const newDepartment = (e) => {
    e.preventDefault();
    const name = e.target.department.value;
    if (name.length === 0) {
      setMessage('Please, Enter  the name!');
      setInputErrorArr([1, 0,]);
    } else {
      setInputErrorArr([0, 0]);
      setMessage(null);
      dispatch(createNewDepartment({name, entity_id: id}));
      setLoader(true)
    }
  };

  useEffect(() => {
    if (response === 'department created successfully!') {
      setMessage(null);
      navigate(`../entity/${id}`);
      dispatch(deleteDepartmentResponse());
      setLoader(false)
    }
  }, [response]);

  return (
    <>
        <div className='page-container'>
        
        <FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={newDepartment}
          submitButton={!loader ? 'Create' : <FiLoader className="button-loader white-loader" />}
          submitClass="user-authentication-form-button"
          errorMessage={message}
          inputErrorArr={inputErrorArr}
          inputWrapperClassName="create-item-input-wrapper"/>
      </div>
    </>
  );
};

export default NewDepartment