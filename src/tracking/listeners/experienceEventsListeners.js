import { useContext } from 'react';
import {
    PURCHASE_PRODUCT,
    SHARE_EXPERIENCE,
    PAGE_VIEW,
    VIEW_SCENE
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

export const onViewScene = (addEventHandler, event={}, eventsHistory) => {        
    console.table({
        type: "Scene Vista",
        event: event.name_scene,
    })

    addEventHandler({                
        type: VIEW_SCENE,
        name_scene: event.name_scene,
        count: 1
    })
    return event;
}
onViewScene.eventType = VIEW_SCENE;


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
export const onPageView = (setAnalyticData, event, eventsHistory) => {
    
    // For example let's push the recieved event to our Datalyer!
    //window.dataLayer.push(event)
    console.log({
        type: "Pagina Visitada",
        event: event,
    })

    setAnalyticData({        
        id_experience: event.id_experience,
        name_experience: event.name_experience,
    })
    
    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onPageView.eventType = PAGE_VIEW;
