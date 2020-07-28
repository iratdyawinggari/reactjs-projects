export const setListCategoryAction = (setListCategory) => {
    return {
        type: 'SET_LIST_CATEGORY',
        payload: setListCategory
    }
};

export const updateCategoryAction = (category) => {
    return {
        type: 'UPDATE_CATEGORY',
        payload: category
    }
};
export const selectCategoryAction = (category) => {
    return {
        type: 'SELECT_CATEGORY',
        payload: category
    }
};