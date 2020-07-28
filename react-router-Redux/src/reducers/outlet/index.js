export const getListOutlet = (outletList = [], action) => {
    if (action.type === 'SET_LIST_OUTLET') {
        return [...action.payload];
    }
    return outletList;
};

export const updateOutlet = (outlet = {}, action) => {
    if (action.type === 'UPDATE_OUTLET') {
        return action.payload;
    }
    return outlet;
};

// export const selectCategory = (category = {}, action) => {
//     if (action.type === 'SELECT_CATEGORY') {
//         return action.payload;
//     }
//     return category;
// };