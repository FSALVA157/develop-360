
import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { authTypes } from './types'

const initialState = {
    isLogged: false,
    userId: null,
    username: null, 
    token: null,
    refreshToken: null,
}



export const AuthProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, initialState)

    const login = (data) => {
      dispatch({
        type: authTypes.login,
        payload: data
      })
    }

  return (
    <AuthContext.Provider value={{authState, login}}>
      {children}
    </AuthContext.Provider>
  )
}
