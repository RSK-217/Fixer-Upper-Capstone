import React from 'react';
import { Route } from 'react-router-dom';
import { ProjectForm } from './project/ProjectForm';

export const ApplicationViews = () => {
  return (
    <>
        <Route path="/form"><ProjectForm /></Route>
    </>
  )
}

export default ApplicationViews