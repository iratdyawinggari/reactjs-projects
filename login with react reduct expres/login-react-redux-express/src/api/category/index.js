export function getCategory() {
    return fetch(process.env.REACT_APP_WS_URL + '/category', {
        method: 'GET'
    })
}