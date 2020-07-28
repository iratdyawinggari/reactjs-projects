export const getListCategory = (categoryList = [], action) => {
    if (action.type === 'SET_LIST_CATEGORY') {
        return [...action.payload];
    }
    return categoryList;
};

export const updateCategory = (category = {}, action) => {
    if (action.type === 'UPDATE_CATEGORY') {
        return action.payload;
    }
    return category;
};

export const selectCategory = (category = {}, action) => {
    if (action.type === 'SELECT_CATEGORY') {
        return action.payload;
    }
    return category;
};