import { useContext } from 'react';
import {
    PURCHASE_PRODUCT,
    SHARE_EXPERIENCE,
    PAGE_VIEW,
} from '../constants'



/**
 * Listener on purchase event
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onPurchase = (event = {}, eventsHistory) => {
    // For example let's push the recieved event to our Datalyer!
    window.dataLayer.push(event)

    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onPurchase.eventType = PURCHASE_PRODUCT;

/**
 * Listener on share Experience
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onShareExperience = (event={}, eventsHistory) => {        
    console.table({
        type: "Experiencia compartida",
        event: event,
    })
    return event;
}
onShareExperience.eventType = SHARE_EXPERIENCE;

/**
 * Listener on page view
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onPageView = (addEvent, event, eventsHistory) => {
    
    // For example let's push the recieved event to our Datalyer!
    //window.dataLayer.push(event)
    console.table({
        type: "Pagina Visitada",
        event: event,
    })

    addEvent({        
        data: event,
        timestamp: Date.now()
    })
    
    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onPageView.eventType = PAGE_VIEW;
