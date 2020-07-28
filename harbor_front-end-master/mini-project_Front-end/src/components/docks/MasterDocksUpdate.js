import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListDockStatusByIdService, getListDockStatusServiceforInput} from "../../api/dockStatus";
import {getHarborCodebyId, getListHarborServiceforDocks} from "../../api/harbor";
import {addDockService, deleteDockService, updateDockService} from "../../api/docks";
import {toast} from 'react-toastify';


toast.configure();

export class MasterDockUpdate extends React.Component {
    state = {dockCode: '', dockName: '', harborId: '', statusId: '', forAct: '', listStatusDock: [], listHarbor: []};

    componentDidMount() {
        this.doGetListDockStatus();
        this.doGetListHarbor();
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                dockCode: this.props.history.location.state.dock.dockCode,
                dockName: this.props.history.location.state.dock.dockName,
                harborId: this.props.history.location.state.dock.harbor.harborCode,
                statusId: this.props.history.location.state.dock.dockStatus.dockStatusId,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputDockCodeChange = async (event) => {
        await this.setState({dockCode: event.target.value});
        console.log(this.state.dockCode)
    };
    onInputDockNameChange = async (event) => {
        await this.setState({dockName: event.target.value});
        console.log(this.state.dockName)
    };

    doUpdate = (e) => {
        e.preventDefault();
        switch (this.state.forAct) {
            case 'Delete':
                this.onDelete();
                break;
            case 'Update':
                this.onUpdate();
                break;
            case 'Create':
                this.onCreate();
                break;
            default:
                break;
        }
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterDocks'
        })
    };

    onInputstatusCodeChange = async (event) => {
        await this.setState({statusId: event.target.value});
        console.log(this.state.statusId)
    };

    onInputHarborCodeChange = async (event) => {
        await this.setState({harborId: event.target.value});
        console.log(this.state.harborId)
    };

    doGetListDockStatus = async () => {
        const response = await getListDockStatusServiceforInput();
        const data = await response.json();
        this.setState({listStatusDock: data});
    };

    doGetListHarbor = async () => {
        const response = await getListHarborServiceforDocks();
        const data = await response.json();
        this.setState({listHarbor: data})
    };

    onCreate = async (e) => {
        const harborId = await getHarborCodebyId(this.state.harborId);
        const harbor = await harborId.json();
        console.log(harbor);
        const statusId = await getListDockStatusByIdService(this.state.statusId);
        const status = await statusId.json();
        console.log(status);
        const add = await addDockService(this.state.dockCode, this.state.dockName, harbor, status);
        console.log(add);
        toast.success("data Successfully Saved !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterDocks'
        })
    };

    onDelete = async (e) => {
        await deleteDockService(this.state.dockCode);
        toast.success("data Successfully Deleted !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterDocks'
        })
    };

    onUpdate = async (e) => {
        const harborId = await getHarborCodebyId(this.state.harborId);
        const harbor = await harborId.json();
        console.log(harbor);
        const statusId = await getListDockStatusByIdService(this.state.statusId);
        const status = await statusId.json();
        console.log(status);
        const update = await updateDockService(this.state.dockCode, this.state.dockName, harbor, status);
        console.log(update);
        toast.success("data Successfully Updated !", {
            position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push({
            pathname: '/protected/main/masterDocks'
        })
    };

    doRenderHarbor = () => {
        if (this.state.listHarbor) {
            return this.state.listHarbor.map((harbor) => {
                return (
                    <option key={harbor.harbourCode} value={harbor.harborCode}>{harbor.harborName}</option>
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

    doRenderDockStatus = () => {
        if (this.state.listStatusDock) {
            return this.state.listStatusDock.map((dockStatus) => {
                return (
                    <option key={dockStatus.dockStatusId}
                            value={dockStatus.dockStatusId}>{dockStatus.dockStatusName}</option>
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
                                        class="fas fa-dolly-flatbed"></i> {`Master Dock ${this.state.forAct}`}</h5>
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
                                        <label htmlFor="dockCode">Dock Code</label>
                                        <input type="text" name="dockCode" value={this.state.dockCode}
                                               className="form-control"
                                               id="dockCode" onChange={this.onInputDockCodeChange}
                                               readOnly={this.state.forAct === 'Update'}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Dock Name</label>
                                        <input type="text" name="dockName" value={this.state.dockName}
                                               className="form-control"
                                               id="productName" onChange={this.onInputDockNameChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Harbor</label>
                                        <select className="custom-select"
                                                name="harbor"
                                                value={this.state.harborId}
                                                required
                                                onChange={this.onInputHarborCodeChange}>
                                            <option>Open this select menu</option>
                                            {this.doRenderHarbor()} disabled={this.state.forAct === 'Delete'}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productName">Status</label>
                                        <select className="custom-select"
                                                name="status"
                                                value={this.state.statusId}
                                                required
                                                onChange={this.onInputstatusCodeChange}>
                                            <option>Open this select menu</option>
                                            {this.doRenderDockStatus()} disabled={this.state.forAct === 'Delete'}
                                        </select>
                                    </div>
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

// export const mapStateToProps = (state) => {
//     return {updateDock: state.updateDock, listStatus: state.listDockStatus, listHarbor: state.listHarbor};
// };

export default (MasterDockUpdate);
