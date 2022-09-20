import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

// Pages
import Dashboard from '../pages/dashboard/Dashboard';
import Groups from '../pages/groups/Groups';
import ManageGroup from '../pages/groups/ManageGroup';

const authRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    component: <Dashboard/>,
  },
  {
    path: '/groups',
    name: 'Groups',
    component: <Groups/>,
  },
  {
    path: '/groups/:id',
    name: 'Manage Group',
    component: <ManageGroup/>,
  },
  {
    path: '/*',
    name: 'Dashboard',
    component: <Dashboard/>,
  }
]

const AuthRoutes = () => {
  return (
    <Routes>
      {authRoutes.map(rt => <Route path={rt.path} element={rt.component} />)}
    </Routes>
  )
}

export default AuthRoutes
