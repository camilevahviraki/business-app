import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoHome } from 'react-icons/go';
import { FaMapLocationDot } from 'react-icons/fa6';
import { HiOutlineIdentification, HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { TfiMenuAlt } from 'react-icons/tfi';
import Menu from './menu';
import linkName from '../reusable/remove-blanck-space/linkName';
import oasisLogo from '../../images/welcome_page/oasis-logo-orange.png';
import './Header.css';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.authenticationReducer);
  const userNames = `${userData.user.first_name}-${userData.user.last_name}`;
  const firstName = userData.user.first_name;
  const lastName = userData.user.last_name;
  const userImage = userData.user.picture_url;
  const hideMenu = () => {
    setShowMenu(false);
  };

  const [hoveredLink, setHoverdLink] = useState(null);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const iconsStyle = {
    width: '30px',
    height: 'auto',
    marginRight: '30px',
  };

  const links = [
    { id: 1, icon: <GoHome style={iconsStyle} className="header-icons-r" />, link: '../' },
    {
      id: 5,
      icon: <FaMapLocationDot style={iconsStyle} className="header-icons-r" />,
      link: '../entities',
    },
    {
      id: 4,
      icon: <HiOutlineIdentification style={iconsStyle} className="header-icons-r" />,
      link: '../members',
    },
    { id: 2, icon: <HiOutlineDocumentDuplicate style={iconsStyle} className="header-icons-r" />, link: '../documents' },

  ];

  const link2 = [
    { id: 1, icon: <GoHome style={iconsStyle} className="header-icons-r" />, link: '../' },
  ];

  const showLink = (link) => {
    setHoverdLink(link);
  }

  const currenPath = window.location.pathname;

  return (
    <header className="flex align-center w-full">
      <div className="logo-wrap">
        <Link to="../"><img src={oasisLogo} alt="" style={{ height: '30px' }} /></Link>
      </div>
      {
        userData.token ? (<>
          <div className="flex align-center header-icons">
            {
              userData.user.admin ? (
                <>
                  {links.map((linkObj) => (
                    <Link
                      key={linkObj.link}
                      to={linkObj.link}
                      onMouseOver={() => showLink(linkObj)}
                      onMouseLeave={() => setHoverdLink(null)}
                      className={
                        currenPath.substring(1) === linkObj.link.replace(/(\.\.\/)/g, '')
                          ? 'header-current-link' : 'header-home-link'
                      }
                    >
                      {linkObj.icon}
                      <div style={{ position: 'relative' }}>
                        {hoveredLink && hoveredLink.link === linkObj.link ? (
                          <div className='link-name'>
                            {linkObj.link.replace(/(\.\.\/)/g, '')}
                          </div>) : (<></>)}
                      </div>

                    </Link>
                  ))}
                </>
              ) :
                (
                  <>
                    {link2.map((linkObj) => (
                      <Link
                        key={linkObj.link}
                        to={linkObj.link}
                        onMouseOver={() => showLink(linkObj)}
                        onMouseLeave={() => setHoverdLink(null)}
                        className={
                          currenPath.substring(1) === linkObj.link.replace(/(\.\.\/)/g, '')
                            ? 'header-current-link' : 'header-home-link'
                        }
                      >
                        {linkObj.icon}
                        <div style={{ position: 'relative' }}>
                          {hoveredLink && hoveredLink.link === linkObj.link ? (
                            <div className='link-name'>
                              {linkObj.link.replace(/(\.\.\/)/g, '')}
                            </div>) : (<></>)}
                        </div>

                      </Link>
                    ))}
                  </>
                )
            }
          </div>
          <div className="right-icons-wrap flex align-center">
            <Link to={userData.token ? `../account/${linkName(userNames)}` : '../login'} style={{ fontWeight: '700', textDecoration: 'none' }}>

              <div className="user-Icon-wrap">
                {
                  userImage ? (<img src={userImage} alt="" className="user-Icon-r" />) :
                    (<>
                      {firstName.charAt(0)} {lastName.charAt(0)}
                    </>)
                }

              </div>
            </Link>
            <TfiMenuAlt className="user-Icon" onClick={handleShowMenu} />
          </div>
          {showMenu ? <Menu hideMenu={hideMenu} /> : <></>}
        </>) : <></>
      }


    </header>
  );
};

export default Header;
