import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewDocument from './newDocument';
import DocumentsList from './documentsList';
import ShowDocument from './showDocument';

const DocumentsRoutes = () => {
  return (
    <Routes>
      <Route path="documents" element={(<DocumentsList />)} />
      <Route path="entity/:entity_id/department/:department_id/document/new" element={(<NewDocument />)} />
      <Route path='entity/:entity_id/department/:departmet_id/document/:id' element={(<ShowDocument/>)}/>
      <Route path='document/:id' element={(<ShowDocument/>)}/>
   </Routes>
  )
}

export default DocumentsRoutes