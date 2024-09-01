import React, { useReducer } from 'react'
import { AnaliticasContext } from './AnaliticasContext'
import { analiticasReducer } from './analiticasReducer'
import { analiticasTypes as types } from './types'



export const AnaliticasProvider = ({ children }) => {

 const [analiticasState, dispatch] = useReducer(analiticasReducer, {
    id_experience: 0,
    name_experience: 'experience name',
    date: Date.now(),
    additional:[]
  })

  const setAnalyticState = (data) => {
    dispatch({
      type: types.setAnalyticData,
      payload: data
    })
  }

  const addEventHandler = (event) => {    
    dispatch({
      type: types.addEvent,
      payload: event
    })    
  }

  return (
    <AnaliticasContext.Provider value={{analiticasState, setAnalyticState, addEventHandler}}>
      {children}    
    </AnaliticasContext.Provider>
  )
}
