import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListShipStatusService} from "../../api/shipStatus";

class MasterShipStatus extends React.Component {
    state = {listStatusShip: []};

    componentDidMount() {
        this.doGetListShipStatus();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/'
        })
    };


    doGetListShipStatus = async () => {
        const response = await getListShipStatusService();
        const data = await response.json();
        // this.props.setListShipStatusAction(data);
        this.setState({listStatusShip: data})
    };

    doUpdateShipStatus = (shipStatus) => {
        // this.props.updateShipStatusAction(shipStatus);
        this.props.history.push({
            pathname: '/protected/main/masterShipStatusUpdate',
            state: {forAct: 'Update', shipStatus: shipStatus}
        })
    };

    doAddDockStatus = () => {
        this.props.history.push({pathname: '/protected/main/masterShipStatusUpdate', state: {forAct: 'Create'}})
    };

    doRenderListShipStatus = () => {
        if (this.state.listStatusShip) {
            return this.state.listStatusShip.map((shipStatus) => {
                let status;
                if (shipStatus.shipStatusName === 'Suspend') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                   role="progressbar"
                                   style={{width: '30%'}}>{shipStatus.shipStatusName}</span>

                } else if (shipStatus.shipStatusName === 'Unloading') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                   role="progressbar"
                                   style={{width: '30%'}}>{shipStatus.shipStatusName}</span>
                } else if (shipStatus.shipStatusName === 'Sailing') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-success "
                                   role="progressbar"
                                   style={{width: '30%'}}>{shipStatus.shipStatusName}</span>
                } else if (shipStatus.shipStatusName === 'Berthing') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-info "
                                   role="progressbar"
                                   style={{width: '30%'}}>{shipStatus.shipStatusName}</span>
                } else {
                    status =
                        <span className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                              style={{width: '30%'}}>{shipStatus.shipStatusName}</span>
                }
                return (
                    <tr key={shipStatus.shipStatusId}>
                        <td>{shipStatus.shipStatusId}</td>
                        <td>{status}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateShipStatus(shipStatus)
                            }}><i className="fas fa-edit"></i>
                                Edit
                            </button>
                            {/*<button type="button" className='btn btn-link' onClick={() => {*/}
                            {/*    this.doDeleteHarbor(harbor)*/}
                            {/*}}><i className="fas fa-trash"></i>*/}
                            {/*</button>*/}
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan='2'>No Found</td>
                </tr>
            )
        }
    };

    render() {
        return (
            <MainContent {...this.props}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><i class="fas fa-clipboard-list"></i> Master Ship Status
                                </div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </h5>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddDockStatus}><i
                                className="fas fa-plus"></i> New Status
                            </button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Ship Status ID</td>
                                    <td>Ship Status Name</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListShipStatus()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MainContent>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {listShipStatus: state.listShipStatus};
// };
//
// const mapDispatchToProps = {
//     setListShipStatusAction: setListShipStatusAction,
//     updateShipStatusAction: updateShipStatusAction
// };
export default (MasterShipStatus);