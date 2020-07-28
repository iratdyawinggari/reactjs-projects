import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListShipsService} from "../../api/ships";
import {getListShipStatusServiceforInput} from "../../api/shipStatus";
import {getByHarborCodeService} from "../../api/docks";
import {addTransaction, getListTransactionStatusService, getTransactionDoneService} from "../../api/transaction";

import {getListHarborServiceforDocks} from "../../api/harbor";
import {toast} from 'react-toastify';

toast.configure();

class TransactionUpdate extends React.Component {
    state = {
        trxHeaderId: '',
        shipCode: '',
        entryDate: '',
        dockCode: '',
        harborCode: '',
        captainName: '',
        statusId: '',
        weight: 0,
        forAct: '',
        detail: {},
        getListHarbor: {},
        details: [],
        listHarbor: [],
        listShip: [],
        listDock: [],
        listShipStatus: [],
        listTrxStatus: []
    };

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        this.doGetListHarbor();
        this.doGetListShipStatus();
        this.doGetListDock();
        this.doGetListShip();
        this.doGetListTrxStatus();
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                shipCode: this.props.addTransaction.shipCode,
                captainName: this.props.addTransaction.captainName,
                forAct: this.props.history.location.state.forAct
            })
        }
    }

    onInputTrxHeaderIdChange = async (event) => {
        await this.setState({trxHeaderId: event.target.value});
        console.log(this.state.trxHeaderId)
    };
    onInputShipCodeChange = async (event) => {
        await this.setState({shipCode: event.target.value});
        console.log(this.state.shipCode)
    };
    onInputEntryDateChange = async (event) => {
        await this.setState({entryDate: event.target.value});
        console.log(this.state.entryDate)
    };
    onInputDockCodeChange = async (event) => {
        await this.setState({dockCode: event.target.value});
        console.log(this.state.dockCode)
    };
    onInputHarborCodeChange = async (event) => {
        await this.setState({harborCode: event.target.value});
        this.doGetListDock();
        console.log(this.state.harborCode)
    };
    onInputWeightChange = async (event) => {
        await this.setState({weight: event.target.value});
        console.log(this.state.weight)
    };

    onInputCaptainNameChange = async (event) => {
        await this.setState({captainName: event.target.value});
        console.log(this.state.captainName)
    };
    onInputstatusCodeChange = async (event) => {
        await this.setState({statusId: event.target.value});
        console.log(this.state.statusId)
    };

    doUpdate = (e) => {
        if (!this.state.trxHeaderId && !this.state.shipCode) {
            toast.error("Input First !", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            e.preventDefault();
            switch (this.state.forAct) {
                case 'Create':
                    this.doCreate();
                    break;
                case 'Done':
                    this.doGetTrxDone();
                    break;
                default:
                    break;
            }
        }
    };

    doInsertDetail = async (e) => {
        e.preventDefault();
        await this.setState({
            detail: {
                "entryDate": this.state.entryDate,
                "dockCode": this.state.dockCode,
                "captainName": this.state.captainName,
                "shipStatusId": this.state.statusId,
                "loadingUnloadingWeight": this.state.weight,
            },
            entryDate: '',
            dockCode: '',
            captainName: '',
            statusId: '',
            weight: '',
        });
        console.log(this.state.detail);
        await this.setState({
            details: [...this.state.details, this.state.detail]
        });
        console.log(this.state.details)
    };

    doCreate = async (e) => {

        await addTransaction(this.state.trxHeaderId, this.state.shipCode, this.state.details);
        // console.log(this.state.statusId)
        toast.success("data Successfully Saved !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/transaction'
        })
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/transaction'
        })
    };

    doGetTrxDone = async (e) => {
        await getTransactionDoneService(this.state.trxHeaderId);
        // const data = await response.json()
        this.props.history.push({
            pathname: '/protected/main/transaction'
        })
    };

    doGetListShipStatus = async () => {
        const response = await getListShipStatusServiceforInput();
        const data = await response.json();
        // this.props.setListShipStatusAction(data);
        this.setState({listShipStatus: data})
    };

    doGetListHarbor = async () => {
        const response = await getListHarborServiceforDocks();
        const data = await response.json();
        this.setState({listHarbor: data})
    };

    doGetListShip = async () => {
        const response = await getListShipsService();
        const data = await response.json();
        this.setState({listShip: data});
        console.log(data)
    };

    doGetListDock = async () => {
        const response = await getByHarborCodeService(this.state.harborCode);
        const data = await response.json();
        // this.props.setListDockAction(data);
        this.setState({listDock: data});
        console.log(data)
    };

    doGetListTrxStatus = async () => {
        const response = await getListTransactionStatusService();
        const data = await response.json();
        this.setState({listTrxStatus: data});
    };

    // doRenderDetails = () => {
    //     if (this.state.details) {
    //         return this.state.details.map((d) => {
    //             return (
    //                 <option key={ship.shipCode}
    //                         value={ship.shipCode}>{ship.shipName}</option>
    //             )
    //         });
    //     } else {
    //         return (
    //             <tr>
    //                 <option></option>
    //             </tr>
    //         )
    //     }
    // };


    doRenderShipList = () => {
        if (this.state.listShip) {
            return this.state.listShip.map((ship) => {
                return (
                    <option key={ship.shipCode}
                            value={ship.shipCode}>{ship.shipName}</option>
                )
            });
        } else {
            return (
                <tr>
                    <option></option>
                </tr>
            )
        }
    };

    doRenderDockList = () => {
        if (this.state.listDock) {
            return this.state.listDock.map((dock) => {
                return (
                    <option key={dock.dockCode}
                            value={dock.dockCode}>{dock.dockName}</option>
                )
            });
        } else {
            return (
                <tr>
                    <option></option>
                </tr>
            )
        }
    };

    doRenderShipStatus = () => {
        if (this.state.listShipStatus) {
            return this.state.listShipStatus.map((shipStatus) => {
                return (
                    <option key={shipStatus.shipStatusId}
                            value={shipStatus.shipStatusId}>{shipStatus.shipStatusName}</option>
                )
            });
        } else {
            return (
                <tr>
                    <option></option>
                </tr>
            )
        }
    };
    doRenderHarbor = () => {
        if (this.state.listHarbor) {
            return this.state.listHarbor.map((harbor) => {
                return (
                    <option key={harbor.harborCode}
                            value={harbor.harborCode}>{harbor.harborName}</option>
                )
            });
        } else {
            return (
                <tr>
                    <option></option>
                </tr>
            )
        }
    };

    doRenderListDetail = () => {
        // let i = 0
        return this.state.details.map((detail) => {
            const {entryDate, dockCode, captainName, shipStatusId, loadingUnloadingWeight} = detail;
            // let urut = i++
            // console.log(urut)
            // console.log(this.state.details[urut].entryDate)
            return (
                <tr key={entryDate}>
                    <td>{entryDate}</td>
                    <td>{dockCode}</td>
                    <td>{captainName}</td>
                    <td>{shipStatusId}</td>
                    <td>{loadingUnloadingWeight}</td>
                </tr>
            )
        })
    };

    render() {
        return (
            <div>
                <MainContent {...this.props}>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='flex-grow-1'><h5><i
                                        className="fas fa-dolly-flatbed"></i> {`Transaction ${this.state.forAct}`}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <div className="form-group">
                                    <label htmlFor="productId">Transaction Code</label>
                                    <input type="text" value={this.state.trxHeaderId} className="form-control"
                                           id="productId" readOnly={this.state.forAct === 'Update'}
                                           onChange={this.onInputTrxHeaderIdChange}
                                           required disabled={this.state.forAct === 'Delete'}/>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productName">Ship Code</label>
                                    <select className="custom-select"
                                            value={this.state.shipCode}
                                            required
                                            onChange={this.onInputShipCodeChange}>
                                        <option>Open this select menu</option>
                                        {this.doRenderShipList()} disabled={this.state.forAct === 'Delete'}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='flex-grow-1'><h5><i
                                        className="fas fa-dolly-flatbed"></i> Transaction Detail</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <form onSubmit={this.doInsertDetail}>
                                    <div className="form-group">
                                        <label htmlFor="productName">Entry Date</label>
                                        <input type="date" value={this.state.entryDate} className="form-control"
                                               id="productName" onChange={this.onInputEntryDateChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Harbor Name</label>
                                        <select className="custom-select"
                                                value={this.state.harborCode}
                                                required
                                                onChange={this.onInputHarborCodeChange}>
                                            <option>Open this select menu</option>
                                            {this.doRenderHarbor()} disabled={this.state.forAct === 'Delete'}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Dock Name</label>
                                        <select className="custom-select"
                                                value={this.state.dockCode}
                                                required
                                                onChange={this.onInputDockCodeChange}>
                                            <option>Open this select menu</option>
                                            {this.doRenderDockList()} disabled={this.state.forAct === 'Delete'}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Captain Name</label>
                                        <input type="text" value={this.state.captainName} className="form-control"
                                               id="productName" onChange={this.onInputCaptainNameChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Status</label>
                                        <select className="custom-select"
                                                value={this.state.statusId}
                                                required
                                                disabled={this.state.forAct === 'Delete'}
                                                onChange={this.onInputstatusCodeChange}>
                                            <option>Open this select menu</option>
                                            {this.doRenderShipStatus()}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Weight</label>
                                        <input type="number" value={this.state.weight} className="form-control"
                                               id="productName" onChange={this.onInputWeightChange}
                                               required
                                               readOnly={this.state.statusId != 3 && this.state.statusId != 4}
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="card-text">
                                        <table className='table table-sm'>
                                            <thead className="thead-dark">
                                            <tr>
                                                <td>Entry Date</td>
                                                <td>Dock Name</td>
                                                <td>Captain Name</td>
                                                <td>Ship Status</td>
                                                <td>Weight</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.doRenderListDetail()}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='d-flex flex-row-reverse '>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button className="btn btn-primary awesome-button-lg">
                                                {this.state.forAct === 'Delete' ? 'Yes, sure delete it' : 'Save Detail'}
                                            </button>
                                            {/*<button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel*/}
                                            {/*</button>*/}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <br/>
                            <div className='d-flex flex-row-reverse '>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button className="btn btn-primary awesome-button-lg" onClick={this.doUpdate}>
                                        {this.state.forAct === 'Delete' ? 'Yes, sure delete it' : 'Save'}
                                    </button>
                                    <button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*        <div className='d-flex flex-row-reverse '>*/}
                    {/*            <div className="btn-group" role="group" aria-label="Basic example">*/}
                    {/*                <button className="btn btn-primary awesome-button-lg" onClick={this.doUpdate}>*/}
                    {/*                    {this.state.forAct === 'Delete' ? 'Yes, sure delete it' : 'Save'}*/}
                    {/*                </button>*/}
                    {/*                <button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel*/}
                    {/*                </button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </MainContent>
            </div>
        )
    }
}

export default (TransactionUpdate);