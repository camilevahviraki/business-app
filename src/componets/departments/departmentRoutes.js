import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewDepartment from './newDepartment';
import DepartmentShow from './departmentShow';

const DepartmentRoutes = () => {
  return (
   <Routes>
      <Route path="entity/:id/department/new" element={(<NewDepartment />)} />
      <Route path="entity/:entity_id/department/:id" element={(<DepartmentShow />)} />
   </Routes>
  )
}

export default DepartmentRoutes