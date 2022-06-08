import React from 'react';
import { Route } from 'react-router-dom';
import AddContractor from './contractors/AddContractor';
import EditContractor from './contractors/EditContractor';
import MyContractors from './contractors/MyContractors';
import AddExpense from './expenses/AddExpense';
import EditExpense from './expenses/EditExpense';
import AddEstimate from './estimates/AddEstimate';
import EditEstimate from './estimates/EditEstimate';
import ProjectForm from './projects/ProjectForm';
import MyProjects from './projects/MyProjects';
import EditProject from './projects/EditProject';
import DiyProject from './projects/DiyProject';
import ProProject from './projects/ProProject';

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/form"><ProjectForm /></Route>
      
      <Route exact path="/diyProject/:projectId(\d+)"><DiyProject /></Route>
      <Route path="/diyProject/:projectId(\d+)/add"><AddExpense /></Route>
      <Route path="/diyProject/:expenseId(\d+)/edit"><EditExpense /></Route>
      <Route path="/diyProject/:projectId(\d+)/editProject"><EditProject /></Route>
      
      <Route exact path="/proProject/:projectId(\d+)"><ProProject /></Route>
      <Route path="/proProject/:projectId(\d+)/add"><AddEstimate /></Route>
      <Route path="/proProject/:estimateId(\d+)/edit"><EditEstimate /></Route>
      <Route path="/proProject/:projectId(\d+)/editProject"><EditProject /></Route>
      
      <Route path="/projects"><MyProjects /></Route>
      
      <Route exact path="/contractors"><MyContractors /></Route>
      <Route path="/contractors/add"><AddContractor /></Route>
      <Route path="/contractors/:contractorId(\d+)/edit"><EditContractor /></Route>
    </>
  )
}

export default ApplicationViews