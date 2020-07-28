export function getListOutletService() {
    return fetch(process.env.REACT_APP_WS_URL + '/outlets', {
        method: 'GET'
    });
}

export function addOutletService(outletId,outletName) {
    return fetch(process.env.REACT_APP_WS_URL + '/outlets/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'outletId':outletId,
            'outletName':outletName
        })
    })
}

export function updateOutletService(outlet) {
    return fetch(process.env.REACT_APP_WS_URL + '/outlets/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'outletId':outlet.outletId,
            'outletName':outlet.outletName
        })
    })
}
