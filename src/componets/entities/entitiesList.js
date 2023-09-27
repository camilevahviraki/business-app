import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEntities } from '../../redux/entity/getEntitiesReducer';
import { FaLocationDot, FaPlus } from 'react-icons/fa6';
import haedquarterImg from '../../images/haedquarter.png';
import Places from './places/Places';
import './styles/entities.css';

const EntitiesList = () => {
  const dispatch = useDispatch();
  const steps = ['Entities List', 'Locations'];
  const [step, setStep] = useState(1);
  const containerRef = useRef(null);
  const [scrollTo, setScrollTo] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);

  useEffect(() => {
    dispatch(getEntities())
  }, []);

  const entities = useSelector(state => state.getEntitiesReducuer).data;

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  if (scrollTo !== step) {
    if (containerRef.current) {
      containerRef.current.scrollTo(
        {
          top: 0,
          left: ((step - 1) * containerWidth),
          behavior: 'smooth',
        },
      );
      setScrollTo(step);
    }
  }

  return (
    <div className='page-container page-flex-row' ref={containerRef}>
      <div className="item-progress-bar-container">
        {
          steps.map((stepUp, key) => (
            <div
              key={stepUp}
              className={step === key + 1 ? 'item-step active-step' : 'item-step'}
              style={key + 1 === steps.length
                ? {
                  width: `${(100 - ((steps.length - 1) / 2)) / steps.length}%`,
                }
                : {
                  width: `${97 / steps.length}%`,
                  marginRight: '0.5%',
                }}
              onClick={() => setStep(key + 1)}
            >
              {stepUp}
            </div>
          ))
        }
      </div>
      <div className="entity-list-wrapper">
        <Link
          className='new-department'
          to={`../newEntity`}
        >
          <FaPlus />{' '}New Entity
        </Link>
        {
          step === 1 ? entities.map((entity) => {
            const {
              id, country, description, name
            } = entity;

            return (
              <Link to={`../entity/${id}`} className='entity-container'>
                <div className='entity-image-wrapper'>
                  <img src={haedquarterImg} alt='' className='entity-image' />
                </div>
                <div className='entity-description'>
                  <h3 className='entity-title'>{name}</h3>
                  <div className='entity-location'><FaLocationDot /> : {country}{' '}branch</div>
                </div>
                <p>{description}</p>
              </Link>)
          }) : <></>
        }
      </div>

      <div className="entity-list-wrapper">
        {
          step === 2 ? (<Places />) : <></>
        }
      </div>


    </div>
  )
}

export default EntitiesList