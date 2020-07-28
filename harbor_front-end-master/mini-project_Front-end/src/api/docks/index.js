// export function getListDockService() {
//     return fetch(process.env.REACT_APP_WS_URL + '/docks', {
//         method: 'GET'
//     });
// }
//
// export function getListDockAvailableService() {
//     return fetch(process.env.REACT_APP_WS_URL + '/docks/available', {
//         method: 'GET'
//     });
// }

export function getListDockPaginationService(page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/docks/page/?page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function addDockService(dockCode, dockName, harbor, status) {
    return fetch(process.env.REACT_APP_WS_URL + "/docks/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'dockCode': dockCode,
            'dockName': dockName,
            "harbor": harbor,
            'dockStatus': status
        })
    })
}

export function getByHarborCodeService(harborCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/docks/byHarborCode", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'harborCode': harborCode,
        })
    })
}

export function updateDockService(dockCode, dockName, harbor, status) {
    return fetch(process.env.REACT_APP_WS_URL + "/docks/update", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'dockCode': dockCode,
            'dockName': dockName,
            "harbor": harbor,
            'dockStatus': status
        })
    })
}

// export function getDockById(dockCode) {
//     return fetch(process.env.REACT_APP_WS_URL + "/docks/id", {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             'dockCode': dockCode
//         })
//     })
// }

export function deleteDockService(dockCode) {
    return fetch(process.env.REACT_APP_WS_URL + "/docks/delete", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'dockCode': dockCode
        })
    })
}