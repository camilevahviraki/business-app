import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createNewEntity, deleteEntityResponse } from '../../redux/entity/createEntityReducer';
import FormR from '../reusable/form/FormR';
import NewEnityLocation from './newEntityLocation';

const NewEntity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0, 0]);
  const response = useSelector((state) => state.createEntityReducer).message;
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    localStorage.removeItem('clickedLocation');
    localStorage.removeItem('currentLocation');
  }, [])

  const inputsArray = [
    {
      type: 'text',
      placeholder: 'Oasis Kigali',
      classInput: 'user-authentication-form-input',
      label: 'name',
      name: 'entityName',
    },
    {
      type: 'text',
      placeholder: 'Country',
      classInput: 'user-authentication-form-input',
      name: 'country',
      label: 'Country',
    },
    {
      type: 'textarea',
      name: 'description',
      classInput: 'user-authentication-form-input',
      placeholder: 'Oasis Kigali head quarter',
      label: 'description',
    }
  ];

  const createNewItem = (e) => {
    e.preventDefault();
    const name = e.target.entityName.value;
    const description = e.target.description.value;
    const country = e.target.country.value;

    if (country.length < 3) {
      setMessage('Please! Input a real country name');
      setInputErrorArr([ 0, 1, 0, 0, 0]);
    } else if (name.length === 0) {
      setMessage('Please, Enter  the name!');
      setInputErrorArr([1, 0, 0, 0]);
    } else {
      setInputErrorArr([0,  0, 0, 0]);
      setMessage(null);
      setShowMap(true)
      setData({
        name, description, country
      })

    }
  };

  const getCoordinates = (location) => {
    console.log({...data, location})
    if(location){
        dispatch(createNewEntity({...data, location}))
    }
    
  }

  useEffect(() => {
    if (response === 'entity created successfully!') {
      setMessage(null);
      navigate(`../entities`);
      dispatch(deleteEntityResponse());
     
    }
  }, [response]);

  return (
    <>
      <div className="page-container">
        
        {!showMap?<FormR
          classForm="create-item-form"
          inputsArray={inputsArray}
          submitFunction={createNewItem}
          submitButton={'Next'}
          submitClass="user-authentication-form-button"
          errorMessage={message}
          inputErrorArr={inputErrorArr}
          inputWrapperClassName="create-item-input-wrapper"
        />:<></> }
      </div>
      <div className="create-order-map-container">
        {showMap ? (
          <NewEnityLocation getCoordinates={getCoordinates}/>
        ) : null}
      </div>
    </>
  );
};

export default NewEntity;
