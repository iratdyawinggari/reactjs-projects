export function getListProductService() {
    return fetch(process.env.REACT_APP_WS_URL + '/products', {
        method: 'GET'
    });
}