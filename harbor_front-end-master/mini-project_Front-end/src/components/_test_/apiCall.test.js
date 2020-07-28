import {validateUserName} from "../../api/user";
import {validatePassword} from "../../api/user";
import {getListShipsService, addShipService, updateShipService, deleteShipService} from "../../api/ships";
import {getListShipStatusService,getListShipStatusServiceforInput,getListShipStatusByIdService,addShipStatusService,updateShipStatusService} from "../../api/shipStatus"
import "../../setupTest"


beforeEach(() => {
    fetch.resetMocks();
});

describe('API User', () => {
    it('should call validate username', () => {
        fetch.mockResponseOnce(JSON.stringify({name: 'rey@gmail'}));
        return validateUserName('rey@gmail').then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({name: 'rey@gmail'}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call validate password', () => {
        fetch.mockResponseOnce(JSON.stringify({name: '123'}));
        return validatePassword('123').then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({name: '123'}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
});
describe('API ship', () => {
    it('should call add Service', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: [{
                'shipCode': "shipCode",
                'shipName': "shipName",
                'captainName': "captainName"
            }]
        }));
        return addShipService([{
            'shipCode': "shipCode",
            'shipName': "shipName",
            'captainName': "captainName"
        }]).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({
                name: [{
                    'shipCode': "shipCode",
                    'shipName': "shipName",
                    'captainName': "captainName"
                }]
            }));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call update ship Service', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: [{
                'shipCode': "shipCode",
                'shipName': "shipName",
                'shipStatus': 'shipStatus',
                'captainName': "captainName"
            }]
        }));
        return updateShipService([{
            'shipCode': "shipCode",
            'shipName': "shipName",
            'shipStatus': 'shipStatus',
            'captainName': "captainName"
        }]).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({
                name: [{
                    'shipCode': "shipCode",
                    'shipName': "shipName",
                    'shipStatus': 'shipStatus',
                    'captainName': "captainName"
                }]
            }));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call delete ship Service', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: {
                'shipCode': "shipCode"
            }
        }));
        return deleteShipService({
            'shipCode': "shipCode"
        }).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({
                name: {
                    'shipCode': "shipCode"
                }
            }));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call list ship', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: [{
                "shipCode": "S-0001",
                "shipName": "Ship1",
                "captainName": "Cap1",
                "shipStatus": {
                    "shipStatusId": 1,
                    "shipStatusName": "Sailing"
                }
            }]
        }));
        return getListShipsService([{
            "shipCode": "S-0001",
            "shipName": "Ship1",
            "captainName": "Cap1",
            "shipStatus": {
                "shipStatusId": 1,
                "shipStatusName": "Sailing"
            }
        },]).then(res => {
            expect(res.status).toEqual(200);
            // expect(res.body).toEqual(JSON.stringify({name: '123'}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call delete ship service', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: {
                "shipCode": "S-0001"
            }
        }));
        return getListShipsService({
            "shipCode": "S-0001"
        }).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({name: {"shipCode" :"S-0001"}}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
})
describe('API ship status', () => {
    it('should call list shipStatus', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: [{
                "shipStatusId": "S-0001",
                "shipStatusName": "Ship1",
            }]
        }));
        return getListShipStatusService([{
            "shipStatusId": "S-0001",
            "shipStatusName": "Ship1",
        }]).then(res => {
            expect(res.status).toEqual(200);
            // expect(res.body).toEqual(JSON.stringify({name: '123'}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call list shipStatusWithoutSuspend', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: {
                "shipStatusId": "S-0001",
                "shipStatusName": "Ship1",
            }
        }));
        return getListShipStatusServiceforInput({
            "shipStatusId": "S-0001",
            "shipStatusName": "Ship1",
        }).then(res => {
            expect(res.status).toEqual(200);
            // expect(res.body).toEqual(JSON.stringify({name: '123'}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    });
    it('should call list shipStatusById', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: {
                "shipStatusId": "S-0001"
            }
        }));
        return getListShipStatusByIdService({
            "shipStatusId": "S-0001"
        }).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({name: {"shipStatusId" : "S-0001"}}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call add shipStatus', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: {
                "shipStatusId": "S-0001",
                "shipStatusName" : "shipStatusName"
            }
        }));
        return addShipStatusService({
            "shipStatusId": "S-0001",
            "shipStatusName" : "shipStatusName"
        }).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({name: {"shipStatusId" : "S-0001", "shipStatusName" : "shipStatusName"}}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
    it('should call update shipStatus', () => {
        fetch.mockResponseOnce(JSON.stringify({
            name: {
                "shipStatusId": "S-0001",
                "shipStatusName" : "shipStatusName"
            }
        }));
        return updateShipStatusService({
            "shipStatusId": "S-0001",
            "shipStatusName" : "shipStatusName"
        }).then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(JSON.stringify({name: {"shipStatusId" : "S-0001", "shipStatusName" : "shipStatusName"}}));
        }).finally(() => {
            expect(fetch.mock.calls.length).toEqual(1);
        })
    })
})