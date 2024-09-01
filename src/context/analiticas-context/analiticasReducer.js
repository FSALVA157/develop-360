import { analiticasTypes as types } from "./types";

// const initialState = {
//     id_experience: 0,
//     name_experience: 'experience name',
//     date: Date.now(),
//     additional:[]
//   }

export const analiticasReducer = (state={}, action) => {
    switch (action.type) {
        case types.setAnalyticData:
            return{                
                id_experience: action.payload.id_experience,
                name_experience: action.payload.name_experience,
                date:Date.now(),
                additional:[]
            }
        case types.addEvent:
            return {
                ...state,
                additional:[...state.additional, action.payload]                
            }    
        case types.removeEvent:
            return  state.filter((event) => event.id !== action.payload);
        // case types.resetAnalytics:
        //     return {
        //         ...state,
        //         events: [],
        //     };
        // case types.sincEvent:
        //     return {
        //         ...state, 
        //     }
        // case types.updateEvent:
        //     return {
        //         ...state,
        //         events: state.map((event) => {
        //             if (event.id === action.payload.id) {
        //                 return action.payload;
        //             }
        //             return event;
        //         }),
        //     };
        default:
            return state;   
        }
}