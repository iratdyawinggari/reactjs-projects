export function getListHarborService() {
    return fetch(process.env.REACT_APP_WS_URL + '/harbors', {
        method: 'GET'
    });
}

export function getListHarborServiceforDocks() {
    return fetch(process.env.REACT_APP_WS_URL + '/harbors/withoutSuspend', {
        method: 'GET'
    });
}

export function getListHarborPaginationService(page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/harbors/page/?page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function addHarbourService(harborCode, harborName, harbourCapacity, harborStatus) {
    return fetch(process.env.REACT_APP_WS_URL + "/harbors/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborCode': harborCode,
            'harborName': harborName,
            'harborCapacity': harbourCapacity,
            'harborStatus': harborStatus
        })
    })
}

export function updateHarbourService(harbourCode, harbourName, harbourCapacity, harborStatus) {
    return fetch(process.env.REACT_APP_WS_URL + "/harbors/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborCode': harbourCode,
            'harborName': harbourName,
            'harborCapacity': harbourCapacity,
            'harborStatus': harborStatus
        })
    })
}

export function getHarborCodebyId(harbourCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/harbors/id", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborCode': harbourCode
        })
    })
}

export function deleteHarborService(harbourCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/harbors/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborCode': harbourCode
        })
    })
}