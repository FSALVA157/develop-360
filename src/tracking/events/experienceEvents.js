import {
    PURCHASE_PRODUCT,
    SHARE_EXPERIENCE,
    PAGE_VIEW,
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
 * get star product event object!
 * @param {Number} friendId 
 */
export const shareExperienceEvent = productId => ({
    type: SHARE_EXPERIENCE,
    data: {
        productId
    }
});

/**
 * get page view event object!
 * @param {Number} friendId 
 */
export const pageViewEvent = pageName => ({
    type: PAGE_VIEW,
    data: {
        pageName: pageName,        
    }
})