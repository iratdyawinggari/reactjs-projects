import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListDockStatusService} from "../../api/dockStatus";

class MasterDockStatus extends React.Component {
    state = {
        listStatusDock: []
    };

    componentDidMount() {
        this.doGetListDockStatus();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/'
        })
    };


    doGetListDockStatus = async () => {
        const response = await getListDockStatusService();
        const data = await response.json();
        this.setState({listStatusDock: data})
    };

    doUpdateDockStatus = (dockStatus) => {
        // this.props.updateDockStatusAction(dockStatus);
        this.props.history.push({
            pathname: '/protected/main/masterDockStatusUpdate',
            state: {forAct: 'Update', dockStatus: dockStatus}
        })
    };

    // doDeleteHarbor = (harbor) => {
    //     this.props.updateHarborAction(harbor);
    //     this.props.history.push({pathname: '/protected/main/masterHarborUpdate', state: {forAct: 'Delete'}})
    // };
    doAddDockStatus = () => {
        this.props.history.push({pathname: '/protected/main/masterDockStatusUpdate', state: {forAct: 'Create'}})
    };

    doRenderListDockStatus = () => {
        if (this.state.listStatusDock) {
            return this.state.listStatusDock.map((dockStatus) => {
                let status;
                if (dockStatus.dockStatusName === 'Available') {
                    status = <span className='btn btn-success' style={{width: '35%'}}>{dockStatus.dockStatusName}</span>
                } else if (dockStatus.dockStatusName === 'Unavailable') {
                    status = <span className='btn btn-warning' style={{width: '35%'}}>{dockStatus.dockStatusName}</span>
                } else if (dockStatus.dockStatusName === 'Suspend') {
                    status = <span className='btn btn-danger' style={{width: '35%'}}>{dockStatus.dockStatusName}</span>
                } else {
                    status = <span className='btn btn-info' style={{width: '35%'}}>{dockStatus.dockStatusName}</span>
                }
                return (
                    <tr key={dockStatus.dockStatusId}>
                        <td>{dockStatus.dockStatusId}</td>
                        <td>{status}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateDockStatus(dockStatus)
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
                                <div className='flex-grow-1'><i class="fas fa-clipboard-list"></i> Master DockStatus
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
                                    <td>Dock ID</td>
                                    <td>Dock Name</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListDockStatus()}
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
//     return {listDockStatus: state.listDockStatus};
// };
//
// const mapDispatchToProps = {
//     setListDockStatusAction: setListDockStatusAction,
//     updateDockStatusAction: updateDockStatusAction
// };
export default (MasterDockStatus);