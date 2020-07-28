export function getListShipsService() {
    return fetch(process.env.REACT_APP_WS_URL + '/ships', {
        method: 'GET'
    });
}

export function getListShipsPaginationService(page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/page/?page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchShipsService(shipName,page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/shipName/?shipName=${shipName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchShipCodeService(shipCode,page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/shipCode/?shipCode=${shipCode}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchCaptainNameCodeService(captainName,page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/captainName/?captainName=${captainName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchStatusNameService(statusName,page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/ships/status/?status=${statusName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function addShipService(shipCode, shipName, captainName) {
    return fetch(process.env.REACT_APP_WS_URL + "/ships/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'shipCode': shipCode,
            'shipName': shipName,
            // "shipStatus": status,
            'captainName': captainName
        })
    })
}

export function updateShipService(shipCode, shipName, status, captainName) {
    return fetch(process.env.REACT_APP_WS_URL + "/ships/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'shipCode': shipCode,
            'shipName': shipName,
            "shipStatus": status,
            'captainName': captainName
        })
    })
}

export function deleteShipService(shipCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/ships/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'shipCode': shipCode
        })
    })
}