import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewEntity from './newEntity';
import EntitiesList from './entitiesList';
import EntityShow from './entityShow';

const EntityRoutes = () => {
  return (
   <Routes>
      <Route path="newEntity" element={(<NewEntity />)} />
      <Route path="entities" element={(<EntitiesList />)} />
      <Route path="entity/:id" element={(<EntityShow/>)}/>
   </Routes>
  )
}

export default EntityRoutes