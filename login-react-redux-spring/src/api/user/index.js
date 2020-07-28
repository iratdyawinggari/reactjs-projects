export function addUser(email, password) {
    return fetch(process.env.REACT_APP_WS_URL + '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    })
}

export function authEmail(email) {
    return fetch(process.env.REACT_APP_WS_URL + '/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'email': email
        })
    })
}

export function authPass(password) {
    return fetch(process.env.REACT_APP_WS_URL + '/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'password': password
        })
    })
}

export function login(email,password){
    return fetch(process.env.REACT_APP_WS_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'userName':email,
            'userPassword': password
        })
    })
}