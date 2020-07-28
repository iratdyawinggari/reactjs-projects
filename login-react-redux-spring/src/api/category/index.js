export function getCategory() {
    return fetch(process.env.REACT_APP_WS_URL + '/category', {
        method: 'GET'
    })
}

export function deleteCategory(id){
    return fetch(process.env.REACT_APP_WS_URL + '/deleteCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id':id,
        })
    })
}

export function insertCategory(categoryName){
    return fetch(process.env.REACT_APP_WS_URL + '/addCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'categoryName':categoryName,
        })
    })
}

export function searchCategoryById(id){
    return fetch(process.env.REACT_APP_WS_URL + '/findCategoryById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id':id,
        })
    })
}

export function updateCategory(id,CategoryName){
    return fetch(process.env.REACT_APP_WS_URL + '/updateCategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'id':id,
            'categoryName':CategoryName
        })
    })
}

