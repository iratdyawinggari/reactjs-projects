import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListharborStatusService} from "../../api/harborStatus";

class MasterHarborStatus extends React.Component {
    state = {listStatusHarbor: []};

    componentDidMount() {
        this.doGetListHarborStatus();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/'
        })
    };


    doGetListHarborStatus = async () => {
        const response = await getListharborStatusService();
        const data = await response.json();
        // this.props.setListHarborStatusAction(data);
        this.setState({listStatusHarbor: data});
        console.log(data)
    };

    doUpdateHarborStatus = (harborStatus) => {
        // this.props.updateharborStatusAction(harborStatus);
        this.props.history.push({
            pathname: '/protected/main/masterHarborStatusUpdate',
            state: {forAct: 'Update', harborStatus: harborStatus}
        })
    };

    doAddharborStatus = () => {
        this.props.history.push({pathname: '/protected/main/masterHarborStatusUpdate', state: {forAct: 'Create'}})
    };

    doRenderListHarborStatus = () => {
        if (this.state.listStatusHarbor) {
            return this.state.listStatusHarbor.map((harborStatus) => {
                console.log(harborStatus);
                let status;
                if (harborStatus.harborStatusName === 'Available') {
                    status =
                        <span className='btn btn-success' style={{width: '40%'}}>{harborStatus.harborStatusName}</span>
                } else if (harborStatus.harborStatusName === 'Suspend') {
                    status =
                        <span className='btn btn-danger' style={{width: '40%'}}>{harborStatus.harborStatusName}</span>
                } else if (harborStatus.harborStatusName === 'Unavailable') {
                    status =
                        <span className='btn btn-warning' style={{width: '40%'}}>{harborStatus.harborStatusName}</span>
                } else {
                    status =
                        <span className='btn btn-info' style={{width: '40%'}}>{harborStatus.harborStatusName}</span>
                }
                return (
                    <tr key={harborStatus.harborStatusId}>
                        <td>{harborStatus.harborStatusId}</td>
                        <td>{status}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateHarborStatus(harborStatus)
                            }}><i className="fas fa-edit"></i>
                                Edit
                            </button>
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
                                <div className='flex-grow-1'><i class="fas fa-clipboard-list"></i> Master harborStatus
                                </div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </h5>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddharborStatus}><i
                                className="fas fa-plus"></i> New Status
                            </button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Harbor Status ID</td>
                                    <td>Harbor Status Name</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListHarborStatus()}
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
//     return {listHarborStatus: state.listHarborStatus};
// };

// const mapDispatchToProps = {
//     setListHarborStatusAction: getListHarborStatusAction,
//     updateharborStatusAction: updateHarborStatusAction
// };
export default (MasterHarborStatus);