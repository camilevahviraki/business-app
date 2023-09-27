import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDetails from './userDetails';
import UserList from './userList';
import UserAccount from './userAccount/userAccount';

const UserRoutes = () => {

  const user = useSelector((state) => state.authenticationReducer);

  return (
    <Routes>
      {
        user.user.admin ? (<>
          <Route path='members' element={(<UserList />)} />
          <Route path="entity/:entity_id/department/:department_id/user/:id" element={(<UserDetails />)} />
        </>) : <></>
      }
      <Route path='account/:name' element={(<UserAccount />)} />

    </Routes>
  )
}

export default UserRoutes;