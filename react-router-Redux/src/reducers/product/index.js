export const getListProduct = (productList = [], action) => {
    if (action.type === 'SET_LIST_PRODUCT') {
        return [...action.payload];
    }
    if (action.type === 'GET_LIST_PRODUCT') {
        return productList;
    }
    return productList;
};

export const updateProduct = (product = {}, action) => {
    if (action.type === 'UPDATE_PRODUCT') {
        return action.payload;
    }
    return product;
};