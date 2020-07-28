export function getListMenuService() {
    return fetch(process.env.REACT_APP_WS_URL + '/menu', {
        method: 'GET'
    });
}