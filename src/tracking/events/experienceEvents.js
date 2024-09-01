import {
    PURCHASE_PRODUCT,
    SHARE_EXPERIENCE,
    PAGE_VIEW,
    VIEW_SCENE
} from '../constants'

/**
 * get purchase event object!
 * @param {Number} friendId 
 */
export const purchaseEvent = productId => ({
    type: PURCHASE_PRODUCT,
    data: {
        productId  
    }
});

/**
 * Evento de compartir experiencia
 */
export const shareExperienceEvent = data => (
    {
    type: SHARE_EXPERIENCE,
    data: data    
});

/**
 *Evento de vista de pagina
 */
export const pageViewEvent = data => ({
    type: PAGE_VIEW,
    data: {
        data: data,        
    }
})

/**
 * Evento de compartir experiencia
 */
export const visitScene = data => (
    {
    type: VIEW_SCENE,
    data: data    
});