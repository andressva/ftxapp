import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import AuthLayout from '../layout/AuthLayout'
import AuthRoutes from '../routes/AuthRoutes'
import UnAuthRoutes from '../routes/UnAuthRoutes'
import { IAuthContextValues } from '../types/auth'
import { useNavigate } from "react-router-dom";

const AppNavigator = () => {
  const { auth, requesting } : IAuthContextValues  = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth){
      navigate("/login")
    }
  }, [])

  if(requesting){
    return <><h1>Cargando...</h1></>
  }

  if(!auth){
    return <UnAuthRoutes/>
  }

  return (
    <AuthLayout>
      <AuthRoutes/>
    </AuthLayout>
  )
}

export default AppNavigator
