import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

// Pages
import Login from '../pages/login/Login';

const unAuthRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: <Login/>,
  }
]

const UnAuthRoutes = () => {
  return (
    <Routes>
      {unAuthRoutes.map(rt => <Route path={rt.path} element={rt.component} />)}
    </Routes>
  )
}

export default UnAuthRoutes
