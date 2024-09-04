
import {
    PURCHASE_PRODUCT,
    SHARE_EXPERIENCE,
    PAGE_VIEW,
    VIEW_SCENE,
    TIME_SPENT
} from '../constants'



/**
 * Listener on purchase event
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onCalculateSpent = (addEventHandler, event={}, eventsHistory) => {        
    console.table({
        type: "Tiempo Permanencia",
        event: event,
    })
    addEventHandler({                
        type: TIME_SPENT,
        id_experience: event.idExperience,
        name_scene: event.nameExperience,
        timeSeconds: event.timeSeconds,        
    })

    return event;
}
onCalculateSpent.eventType = TIME_SPENT;

export const onViewScene = (addEventHandler, event={}, eventsHistory) => {        
    

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
 * 
 */
export const onShareExperience = (addEventHandler, event={}, eventsHistory) => {        
    console.table({
        type: "Experiencia compartida",
        event: event,
    })
    addEventHandler({                
        type: SHARE_EXPERIENCE,
        id_experience_shared: event.idExperienceShared,
        name_scene: event.nameExperienceShared,
        count: 1
    })

    return event;
}
onShareExperience.eventType = SHARE_EXPERIENCE;

/**
 * Listener on page view
 * @param {Object} event 
 * @param {Array} eventsHistory 
 */
export const onPageView = (addEventHandler, event, eventsHistory) => {
    
    // For example let's push the recieved event to our Datalyer!
    //window.dataLayer.push(event)
    

    addEventHandler({        
        type: PAGE_VIEW,
        id_experience: event.id_experience,
        name_experience: event.name_experience,
    })
    
    // In order to save this event in the history (so we can log it) we should return it!
    // otherwise it will be ignored!
    return event;
}
onPageView.eventType = PAGE_VIEW;
