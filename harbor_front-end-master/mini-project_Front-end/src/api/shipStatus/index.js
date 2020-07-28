export function getListShipStatusService() {
    return fetch(process.env.REACT_APP_WS_URL + '/shipStatus', {
        method: 'GET'
    });
}

export function getListShipStatusServiceforInput() {
    return fetch(process.env.REACT_APP_WS_URL + '/shipStatus/withoutSuspend', {
        method: 'GET'
    });
}

export function getListShipStatusByIdService(shipCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/shipStatus/id", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'shipStatusId': shipCode
        })
    })
}

export function addShipStatusService(shipStatusCode, shipStatusName) {
    return fetch(process.env.REACT_APP_WS_URL + "/shipStatus/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'shipStatusId': shipStatusCode,
            'shipStatusName': shipStatusName
        })
    })
}

export function updateShipStatusService(shipStatusCode, shipStatusName) {
    return fetch(process.env.REACT_APP_WS_URL + "/shipStatus/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'shipStatusId': shipStatusCode,
            'shipStatusName': shipStatusName
        })
    })
}