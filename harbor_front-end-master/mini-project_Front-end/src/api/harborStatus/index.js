export function getListharborStatusService() {
    return fetch(process.env.REACT_APP_WS_URL + '/harborStatus', {
        method: 'GET'
    });
}

export function getListharborStatusServiceforInput() {
    return fetch(process.env.REACT_APP_WS_URL + '/harborStatus/withoutSuspend', {
        method: 'GET'
    });
}

export function getListHarborStatusByIdService(harborStatusCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/harborStatus/id", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborStatusId': harborStatusCode
        })
    })
}

export function addHaborStatusService(harborStatusCode, harborStatusName) {
    return fetch(process.env.REACT_APP_WS_URL + "/harborStatus/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborStatusId': harborStatusCode,
            'harborStatusName': harborStatusName
        })
    })
}

export function updateHarborStatusService(harborStatusCode, harborStatusName) {
    return fetch(process.env.REACT_APP_WS_URL + "/harborStatus/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborStatusId': harborStatusCode,
            'harborStatusName': harborStatusName
        })
    })
}