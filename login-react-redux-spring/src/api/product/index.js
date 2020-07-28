export function getProduct() {
    return fetch(process.env.REACT_APP_WS_URL + '/product', {
        method: 'GET'
    })
}

export function searchProductByProductId(productId){
    return fetch(process.env.REACT_APP_WS_URL + '/getProductByProductId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'productId':productId,
        })
    })
}

export function deleteProduct(productId){
    return fetch(process.env.REACT_APP_WS_URL + '/deleteProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'productId':productId,
        })
    })
}

export function insertProduct(productId,productName,price,category){
    return fetch(process.env.REACT_APP_WS_URL + '/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'productId':productId,
            'productName':productName,
            'price':price,
            'category':category
        })
    })
}

export function updateProduct(productId,productName,price,category){
    return fetch(process.env.REACT_APP_WS_URL + '/updateProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'productId':productId,
            'productName':productName,
            'price':price,
            'category':category
        })
    })
}
