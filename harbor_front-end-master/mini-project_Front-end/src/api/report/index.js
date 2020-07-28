export function getReportService() {
    return fetch(process.env.REACT_APP_WS_URL + '/report', {
        method: 'GET'
    });
}