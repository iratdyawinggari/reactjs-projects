import React from 'react';
import MainContent from "../mainContent/MainContent";
import {addShipService, deleteShipService, updateShipService} from "../../api/ships";
import {getListShipStatusByIdService} from "../../api/shipStatus";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export class MasterShipUpdate extends React.Component {
    state = {shipCode: '', shipName: '', statusId: '', captainName: '', forAct: ''};

    // notifyUpdate = () => toast('Successfully updated', {containerId: 'A'});
    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        // this.doGetListShipStatus();
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                shipCode: this.props.history.location.state.ship.shipCode,
                shipName: this.props.history.location.state.ship.shipName,
                statusId: this.props.history.location.state.ship.shipStatus.shipStatusId,
                captainName: this.props.history.location.state.ship.captainName,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputShipCodeChange = async (event) => {
        await this.setState({shipCode: event.target.value});
        console.log(this.state.shipCode)
    };

    onInputShipNameChange = async (event) => {
        await this.setState({shipName: event.target.value});
        console.log(this.state.shipName)
    };

    onInputCaptainNameChange = async (event) => {
        await this.setState({captainName: event.target.value});
        console.log(this.state.captainName)
    };
    // onInputstatusCodeChange = async (event) => {
    //     await this.setState({statusId: event.target.value});
    //     console.log(this.state.statusId)
    // };

    doUpdate = (e) => {
        e.preventDefault();
        switch (this.state.forAct) {
            case 'Delete':
                this.doDelete();
                break;
            case 'Update':
                this.doUpdateShip();
                break;
            case 'Create':
                this.doCreate();
                break;
            default:
                break;
        }
    };

    doCreate = async (e) => {
        // const getId = await getListShipStatusByIdService(this.state.statusId);
        // const status = await getId.json();
        // console.log(status);
        const add = await addShipService(this.state.shipCode, this.state.shipName, this.state.captainName);
        console.log(add);
        toast.success("data Successfully Saved !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterShip'
        })
    };

    doDelete = async (e) => {
        await deleteShipService(this.state.shipCode);
        // console.log(this.state.statusId)
        toast.success("data Successfully Deleted !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterShip'
        })
    };

    doUpdateShip = async (e) => {

        const getId = await getListShipStatusByIdService(this.state.statusId);
        const status = await getId.json();
        console.log(status);
        const update = await updateShipService(this.state.shipCode, this.state.shipName, status, this.state.captainName);
        console.log(this.state.statusId);
        console.log(update);
        toast.success("data Successfully Updated !", {
            position: toast.POSITION.TOP_CENTER
        });

        this.props.history.push({
            pathname: '/protected/main/masterShip'
        })
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterShip'
        })
    };

    // doGetListShipStatus = async () => {
    //     const response = await getListShipStatusServiceforInput();
    //     const data = await response.json();
    //     this.props.setListShipStatusAction(data);
    // };


    render() {
        return (
            <div>
                <MainContent {...this.props}>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='flex-grow-1'><h5><i
                                        class="fas fa-dolly-flatbed"></i> {`Master Ship ${this.state.forAct}`}</h5>
                                    </div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <form onSubmit={this.doUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="productId">Ship Code</label>
                                        <input type="text" value={this.state.shipCode} className="form-control"
                                               id="productId" readOnly={this.state.forAct === 'Update'}
                                               onChange={this.onInputShipCodeChange}
                                               required disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Ship Name</label>
                                        <input type="text" value={this.state.shipName} className="form-control"
                                               id="productName" onChange={this.onInputShipNameChange}
                                               required disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Captain Name</label>
                                        <input type="text" value={this.state.captainName} className="form-control"
                                               id="productName" onChange={this.onInputCaptainNameChange}
                                               required disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    {/*<div className="form-group">*/}
                                    {/*    <label htmlFor="productName">Status</label>*/}
                                    {/*    <select className="custom-select"*/}
                                    {/*            value={this.state.statusId}*/}
                                    {/*            onChange={this.onInputstatusCodeChange}>*/}
                                    {/*        <option disabled={this.state.forAct === 'Delete'}>Open this select menu</option>*/}
                                    {/*        {this.doRenderShipStatus()}*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                    <div className='d-flex flex-row-reverse '>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button className="btn btn-primary awesome-button-lg">
                                                {this.state.forAct === 'Delete' ? 'Yes, sure delete it' : 'Save'}
                                            </button>
                                            <button className="btn btn-danger awesome-button-lg"
                                                    onClick={this.doCancel}>Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         updateShip: state.updateShip,
//         selectShipStatus: state.selectShipStatus,
//         listStatus: state.listShipStatus
//     };
// };

export default (MasterShipUpdate);