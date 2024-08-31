import { analiticasTypes as types } from "./types";


export const analiticasReducer = (state=[], action) => {
    switch (action.type) {
        case types.addEvent:
            return [
                ...state,
                action.payload,
                ];
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