export function getListDockStatusService() {
    return fetch(process.env.REACT_APP_WS_URL + '/dockStatus', {
        method: 'GET'
    });
}

export function getListDockStatusServiceforInput() {
    return fetch(process.env.REACT_APP_WS_URL + '/dockStatus/withoutSuspend', {
        method: 'GET'
    });
}

export function getListDockStatusByIdService(dockCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/dockStatus/id", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'dockStatusId': dockCode
        })
    })
}

export function addDockStatusService(dockStatusCode, dockStatusName) {
    return fetch(process.env.REACT_APP_WS_URL + "/dockStatus/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'dockStatusId': dockStatusCode,
            'dockStatusName': dockStatusName
        })
    })
}

export function updateDockStatusService(dockStatusCode, dockStatusName) {
    return fetch(process.env.REACT_APP_WS_URL + "/dockStatus/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'dockStatusId': dockStatusCode,
            'dockStatusName': dockStatusName
        })
    })
}