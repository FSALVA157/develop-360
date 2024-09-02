import { VIEW_SCENE, SHARE_EXPERIENCE } from "../../tracking/constants";
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
            if(action.payload.type === VIEW_SCENE){
                const existIndexScene = state.additional.findIndex((event) => event.type === VIEW_SCENE && event.name_scene === action.payload.name_scene);
                if(existIndexScene !== -1){
                    const additionalUpdated = state.additional.map((event, index) => {
                        if(index === existIndexScene){
                            return {
                                ...event,
                                count: event.count + 1
                            }
                        }else{
                            return event
                        }                       
                    });
                    return {
                        ...state,
                        additional: additionalUpdated
                    }
                }    
             }
             if(action.payload.type === SHARE_EXPERIENCE){
                const existIndexScene = state.additional.findIndex((event) => event.type === SHARE_EXPERIENCE && event.id_experience_shared === action.payload.id_experience_shared);
                if(existIndexScene !== -1){
                    const additionalUpdated = state.additional.map((event, index) => {
                        if(index === existIndexScene){
                            return {
                                ...event,
                                count: event.count + 1
                            }
                        }else{
                            return event
                        }                       
                    });
                    return {
                        ...state,
                        additional: additionalUpdated
                    }
                }
             }
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