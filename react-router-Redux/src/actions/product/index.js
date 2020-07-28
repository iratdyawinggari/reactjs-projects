export const setListProductAction = (setListProduct) => {
    return {
        type: 'SET_LIST_PRODUCT',
        payload: setListProduct
    }
};

export const updateProductAction = (product) => {
    return {
        type: 'UPDATE_PRODUCT',
        payload: product
    }
};
export const getListProductAction = () => {
    return {
        type: 'GET_LIST_PRODUCT'
    }
};