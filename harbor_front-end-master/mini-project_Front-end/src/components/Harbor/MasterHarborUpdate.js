import React from 'react';
import MainContent from "../mainContent/MainContent";
import {addHarbourService, deleteHarborService, updateHarbourService} from "../../api/harbor";
import {getListHarborStatusByIdService, getListharborStatusServiceforInput} from "../../api/harborStatus";
import {toast} from 'react-toastify';

toast.configure();

class MasterHarborUpdate extends React.Component {
    state = {harbourCode: '', harbourName: '', harbourCapacity: '', statusId: '', forAct: '', listHarborStatus: []};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        this.doGetListHarborStatus();
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                harbourCode: this.props.history.location.state.harbor.harborCode,
                harbourName: this.props.history.location.state.harbor.harborName,
                harbourCapacity: this.props.history.location.state.harbor.harborCapacity,
                statusId: this.props.history.location.state.harbor.harborStatus.harborStatusId,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputHarbourCodeChange = (event) => {
        this.setState({harbourCode: event.target.value})
    };
    onInputHarbourNameChange = (event) => {
        this.setState({harbourName: event.target.value})
    };
    onInputstatusCodeChange = async (event) => {
        await this.setState({statusId: event.target.value});
        console.log(this.state.statusId)
    };
    onInputHarbourCapacityChange = async (event) => {
        await this.setState({harbourCapacity: event.target.value});
        console.log(this.state.harbourCapacity)
    };

    doUpdate = (e) => {
        e.preventDefault();
        switch (this.state.forAct) {
            case 'Delete':
                this.doDelete();
                break;
            case 'Update':
                this.doUpdateAct();
                break;
            case 'Create':
                this.doCreate();
                break;
            default:
                break;
        }
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterHarbor'
        })
    };


    doCreate = async (e) => {
        const id = await getListHarborStatusByIdService(this.state.statusId);
        const status = await id.json();
        const add = await addHarbourService(this.state.harbourCode, this.state.harbourName, this.state.harbourCapacity, status);
        console.log(add);
        toast.success("data Successfully Saved !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterHarbor'
        });
    };

    doUpdateAct = async (e) => {
        const statusId = await getListHarborStatusByIdService(this.state.statusId);
        const status = await statusId.json();
        console.log(status);
        const add = await updateHarbourService(this.state.harbourCode, this.state.harbourName, this.state.harbourCapacity, status);
        console.log(add);
        toast.success("data Successfully Updated !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterHarbor'
        })
    };

    doDelete = async (e) => {
        await deleteHarborService(this.state.harbourCode);
        toast.success("data Successfully Deleted !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterHarbor'
        });
    };

    doGetListHarborStatus = async () => {
        const response = await getListharborStatusServiceforInput();
        const data = await response.json();
        // this.props.setListHarborStatusAction(data);
        this.setState({listStatusHarbor: data});
        console.log(data)
    };

    doRenderHarborStatus = () => {
        if (this.state.listStatusHarbor) {
            return this.state.listStatusHarbor.map((harborStatus) => {
                return (
                    <option key={harborStatus.harborStatusId}
                            value={harborStatus.harborStatusId}
                            disabled={this.state.forAct === 'Delete'}>{harborStatus.harborStatusName}</option>
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

    render() {
        return (
            <div>
                <MainContent {...this.props}>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div className='d-flex flex-row align-items-center'>
                                    <div className='flex-grow-1'><h5><i
                                        class="fas fa-clipboard-list"></i> {`Master Harbor ${this.state.forAct}`}</h5>
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
                                        <label htmlFor="harborCode">Harbor Code</label>
                                        <input type="text" value={this.state.harbourCode} className="form-control"
                                               id="categoryId" readOnly={this.state.forAct === 'Update'}
                                               onChange={this.onInputHarbourCodeChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harborName">Harbor Name</label>
                                        <input type="text" value={this.state.harbourName} className="form-control"
                                               id="categoryName" onChange={this.onInputHarbourNameChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harborName">Harbor Capacity</label>
                                        <input type="number" value={this.state.harbourCapacity} className="form-control"
                                               id="categoryName" onChange={this.onInputHarbourCapacityChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Status</label>
                                        <select className="custom-select"
                                                value={this.state.statusId}
                                                required
                                                onChange={this.onInputstatusCodeChange}>
                                            <option>Open this select menu</option>
                                            {this.doRenderHarborStatus()} }
                                        </select>
                                    </div>
                                    <div className='d-flex flex-row-reverse '>
                                        <div className="btn-group " role="group" aria-label="Basic example">
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
//     return {updateHarbour: state.updateHarbor, listStatus: state.listHarborStatus};
// };

export default (MasterHarborUpdate);