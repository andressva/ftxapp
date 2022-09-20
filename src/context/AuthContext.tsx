import React, { useEffect, useState } from 'react'
import { login } from '../services/auth' 
import { useLocalStorage } from '../hooks/useLocalStorage'

import { IAuthContextValues } from '../types/auth'; 

interface AuthProviderProps {
  children?: React.ReactNode;
}


const AuthContext = React.createContext({})

const AuthProvider = (props: AuthProviderProps) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useLocalStorage('sesion_user', {});
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if(user.token){
      setAuth(true);
    }
  }, [user])

  const handleLogin = (data: any) => {
    setRequesting(true)
    return new Promise((resolve, reject) => {
      login({ email: data.email, password: data.password })
        .then(async (resp: any) => {
          setUser({
            token: resp.data.token,
            email: resp.data.user.email,
            id: resp.data.user.id,
            name: resp.data.user.name,
          });
          setAuth(true)
          setRequesting(false)
          setTimeout(() => {
            resolve(true)
          }, 2000)
        })
        .catch(() => {
          setRequesting(false)
          // resolve(false)
        })
    })
  }

  const handleLogout = (): any => {
    setRequesting(true)
    setUser({})
    setAuth(false)
    window.localStorage.removeItem("sesion_user")
    setRequesting(false)
  }

  const values : IAuthContextValues = {
    auth,
    user,
    requesting,
    handleLogin,
    handleLogout
  }

  return (
    <AuthContext.Provider value={values} >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
