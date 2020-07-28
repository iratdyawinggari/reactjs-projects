export function uploadService(file){
    return fetch(process.env.REACT_APP_WS_URL + '/upload',{
        method: 'POST',
        body: file
    })
}

export function listFileService(){
    return fetch(process.env.REACT_APP_WS_URL + '/download',{
        method: 'GET'
    })
}

export function downloadFileService(file){
    return fetch(process.env.REACT_APP_WS_URL + '/download/'+file,{
        method: 'GET'
    })
}

