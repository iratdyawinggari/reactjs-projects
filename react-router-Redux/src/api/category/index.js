export function getListCategoryService() {
    return fetch(process.env.REACT_APP_WS_URL + '/categories', {
        method: 'GET'
    });
}