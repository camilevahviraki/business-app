import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FaMapLocationDot } from 'react-icons/fa6';
import { HiOutlineIdentification, HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import CheckValidImage from '../reusable/check-image/checkValidImage';
import userIcon from '../../images/user-icon.png';
import './menu.css';
import singularize from '../reusable/singularize/singulartze';

const Menu = (props) => {
  const userData = useSelector((state) => state.authenticationReducer);

  const {
    first_name, last_name, picture_url, email, admin, department, entity
  } = userData.user;
  return (
    <div className="Menu">
      <div className="hide-menu" onClick={props.hideMenu}>
        <MdClose className="icon icon-close-big" color="#fff" />
      </div>
      <div className="menu-user-details w-full h-3/12">
        <div className="menu-user-pic-wrap">
          <img
            src={CheckValidImage({ avartarUrl: picture_url, defaultImg: userIcon })}
            alt=""
          />
        </div>
        <div className="menu-user-name">
          <p>
            {first_name}
            {' '}
            {last_name}
          </p>
          <p className="menu-email">{email}</p>
          {department? <p>{singularize(department.name)} at {entity.name}</p>:<></>}
        </div>
      </div>
      {
        admin ? (
          <div className="menu-links-wrapper flex flex-col">
            <Link
              to={'../entities'}
              onClick={props.hideMenu}
            >
              <span><FaMapLocationDot className="icon" /></span>
              Entities
            </Link>
            <Link
              to={'../members'}
              onClick={props.hideMenu}
            >
              <span><HiOutlineIdentification className="icon" /></span>
              Members
            </Link>
            <Link to={`../documents`} onClick={props.hideMenu}>
              <span><HiOutlineDocumentDuplicate className="icon" /></span>
              Documents
            </Link>
          </div>
        ) : <></>
      }
    </div>
  );
};

export default Menu;
