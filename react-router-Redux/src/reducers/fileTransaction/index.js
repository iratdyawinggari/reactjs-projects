export const getListFile = (fileList = [], action) => {
    if (action.type === 'SET_LIST_FILE') {
        return [...action.payload];
    }
    return fileList;
};

export const uploadFile = (file = {}, action) => {
    if (action.type === 'UPLOAD_FILE') {
        return action.payload;
    }
    return file;
};

