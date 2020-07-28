export function getListTransactionService() {
    return fetch(process.env.REACT_APP_WS_URL + '/transactionDetails', {
        method: 'GET'
    });
}

export function getListTransactionStatusService() {
    return fetch(process.env.REACT_APP_WS_URL + '/transactionDetailStatus', {
        method: 'GET'
    });
}

export function searchTrxIdService(idStart, idEnd, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/trxId/?idStart=${idStart}&idEnd=${idEnd}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });

}
export function searchTrxbyWeightService(startValue, endValue, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/weight/?weightStart=${startValue}&weightEnd=${endValue}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });

}

export function searchTrxbyEntryDateService(dayStart, dayEnd, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/entryDate/?entryDateStart=${dayStart}&entryDateEnd=${dayEnd}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyExitDateService(dayStart, dayEnd, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/exitDate/?exitDateStart=${dayStart}&exitDateEnd=${dayEnd}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxHeaderIdService(trxHeaderId, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/thId/?thId=${trxHeaderId}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyHarborNameService(harborName, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/harborName/?harborName=${harborName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyHarborNameService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/harborName/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyShipNameService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/shipName/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyDockNameService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/dockName/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyCaptainNameService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/captainName/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyShipStatusNameService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/shipStatusName/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyTrxStatusNameService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/transactionStatusName/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyEntryDateService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/entryDate/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyExitDateService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/exitDate/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyWeightService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/weight/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function sortTrxbyTrxHeaderIdService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/thId/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}
export function sortTrxbyIdService(sort, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/trxId/sort/?direction=${sort}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyShipNameService(shipName, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/shipName/?shipName=${shipName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyDockNameService(shipName, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/dockName/?dockName=${shipName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyShipStatusNameService(shipName, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/shipStatusName/?shipStatusName=${shipName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyCaptainNameService(shipName, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/captainName/?captainName=${shipName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function searchTrxbyTransactionStatusNameService(shipName, page,pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/transactionStatusName/?transactionStatusName=${shipName}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function getListTransactionPaginationService(page, pageSize) {
    return fetch(process.env.REACT_APP_WS_URL + `/transactionDetails/page/?page=${page}&pageSize=${pageSize}`, {
        method: 'GET'
    });
}

export function addTransaction(trxHeaderId, shipcode, details) {
    return fetch(process.env.REACT_APP_WS_URL + "/transactions/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'transactionHeaderId': trxHeaderId,
            'shipCode': shipcode,
            "transactionDetailDtoList": details
        })
    })
}

export function getTransactionDoneService(Id) {
    return fetch(process.env.REACT_APP_WS_URL + "/transactionDetails/done", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'id': Id
        })
    })
}