import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoutes from '../componets/user/authentication/AuthRoutes';
import EntityRoutes from '../componets/entities/enityRoutes';
import Header from '../componets/header/Header';
import DepartmentRoutes from '../componets/departments/departmentRoutes';
import UserRoutes from '../componets/user/userRoutes';
import DocumentsRoutes from '../componets/documents/documentsRoutes';
import Home from '../componets/Home/Home';


const Router = () => {

  const user = useSelector((state) => state.authenticationReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={(<Home />)} />
      </Routes>
      <AuthRoutes />
      <Header />
      {
        user.token ? (<>
          <Header />
          <UserRoutes />
          {
            user.user.admin ? (
              <>
                <EntityRoutes />
                <DepartmentRoutes />
                
              </>
            ) : <></>
          }
          <DocumentsRoutes />

        </>) : (<></>)
      }
    </BrowserRouter>
  );
};

export default Router;