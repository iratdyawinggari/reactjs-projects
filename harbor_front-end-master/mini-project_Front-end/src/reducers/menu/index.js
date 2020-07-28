export const menuActive = (menu = {}, action) => {
    if (action.type === 'SET_MENU_ACTIVE') {
        return action.payload;
    }
    return menu;
};

export const menuHeaderActive = (menu = [], action) => {
    switch (action.type) {
        case 'SET_MENU_HEADER_ACTIVE':
            return [...menu, action.payload];
        case 'UNSET_MENU_HEADER_ACTIVE':
            return menu.filter(header => header !== action.payload);
        default:
            return menu;
    }
};

export const ListMenu = (menu = [], action) => {
    if (action.type === 'GET_MENU') {
        return action.payload;
    }
    return menu;
};