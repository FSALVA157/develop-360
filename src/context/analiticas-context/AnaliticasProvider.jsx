import React, { useReducer } from 'react'
import { AnaliticasContext } from './AnaliticasContext'
import { analiticasReducer } from './analiticasReducer'
import { analiticasTypes as types } from './types'



export const AnaliticasProvider = ({ children }) => {

 const [analiticasState, dispatch] = useReducer(analiticasReducer, [{
    id: 1,
    name: 'event1',
    timestamp: Date.now()
  }])

  const addEventHandler = (event) => {
    console.log('**********************************************')
    console.log(analiticasState)
    console.log(event)
    dispatch({
      type: types.addEvent,
      payload: event
    })
    console.log("ESTADO POSTERIOR",analiticasState)
  }

  return (
    <AnaliticasContext.Provider value={{analiticasState, addEventHandler}}>
      {children}    
    </AnaliticasContext.Provider>
  )
}
