export const setMenuActiveAction = (menu) => {
    return {
        type: 'SET_MENU_ACTIVE',
        payload: menu
    }
};
export const setMenuHeaderActiveAction = (header) => {
    return {
        type: 'SET_MENU_HEADER_ACTIVE',
        payload: header
    }
};

export const unsetMenuHeaderActiveAction = (header) => {
    return {
        type: 'UNSET_MENU_HEADER_ACTIVE',
        payload: header
    }
};

export const getListMenuAction = (menu) => {
    return {
        type: 'GET_MENU',
        payload: menu
    }
};