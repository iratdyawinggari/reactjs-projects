export function getProduct() {
    return fetch(process.env.REACT_APP_WS_URL + '/product', {
        method: 'GET'
    })
}