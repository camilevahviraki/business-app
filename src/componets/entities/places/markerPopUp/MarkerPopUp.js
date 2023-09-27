import React from 'react';
import { Link } from 'react-router-dom';
import storeImage from '../../../../images/places-icon2.png';
import haedquarterImg from '../../../../images/haedquarter.png';
import './MarkerPopUp.css';

const MarkerPopUp = (props) => {
  const { data } = props;

  const {
    name,
    id,
  } = data;
  return (
    <div className="marker-pop-up-container">
      <div className="marker-pop-up-image-wrapper">
        <img
          src={haedquarterImg}
          alt=""
          className="marker-pop-up-image"
        />
      </div>
      <h4 className="marker-pop-up-store-name">{name}</h4>
      <Link to={`../entity/${id}`} className="marker-pop-up-link">
       See entity
        {' '}
        {'>'}
      </Link>
    </div>
  );
};

export default MarkerPopUp;
