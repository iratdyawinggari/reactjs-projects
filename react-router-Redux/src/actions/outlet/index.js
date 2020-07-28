export const setListOutletAction = (setListOutlet) => {
    return {
        type: 'SET_LIST_OUTLET',
        payload: setListOutlet
    }
};

export const updateOutletAction = (outlet) => {
    return {
        type: 'UPDATE_OUTLET',
        payload: outlet
    }
};

export const selectOutletAction = (outlet) => {
    return {
        type: 'SELECT_OUTLET',
        payload: outlet
    }
};