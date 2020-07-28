export const setListFileAction = (setListFile) => {
    return {
        type: 'SET_LIST_FILE',
        payload: setListFile
    }
};

export const uploadFileAction = (file) => {
    return {
        type: 'UPLOAD_FILE',
        payload: file
    }
};

