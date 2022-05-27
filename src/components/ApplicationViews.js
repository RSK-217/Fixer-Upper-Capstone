import React from 'react';
import { Route } from 'react-router-dom';
import AddContractor from './contractors/AddContractor';
import MyContractors from './contractors/MyContractors';
import AddExpense from './expenses/AddExpense';
import DiyProject from './projects/DiyProject';
import MyProjects from './projects/MyProjects';
import ProjectForm from './projects/ProjectForm';
import ProProject from './projects/ProProject';

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/form"><ProjectForm /></Route>
      <Route exact path="/diyProject/:projectId(\d+)"><DiyProject /></Route>
      <Route path="/diyProject/:projectId(\d+)/add"><AddExpense /></Route>
      <Route path="/proProject"><ProProject /></Route>
      <Route path="/projects"><MyProjects /></Route>
      <Route exact path="/contractors"><MyContractors /></Route>
      <Route path="/contractors/add"><AddContractor /></Route>
    </>
  )
}

export default ApplicationViews