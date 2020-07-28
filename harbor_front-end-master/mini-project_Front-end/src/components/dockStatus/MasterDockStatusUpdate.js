import React from 'react';
import MainContent from "../mainContent/MainContent";
import {addDockStatusService, updateDockStatusService} from "../../api/dockStatus";

class MasterDockStatusUpdate extends React.Component {
    state = {dockStatusCode: '', dockStatusName: '', forAct: ''};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                dockStatusCode: this.props.history.location.state.dockStatus.dockStatusId,
                dockStatusName: this.props.history.location.state.dockStatus.dockStatusName,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputDockStatusCodeChange = (event) => {
        this.setState({dockStatusCode: event.target.value})
    };
    onInputDockStatusNameChange = (event) => {
        this.setState({dockStatusName: event.target.value})
    };

    doUpdate = (e) => {
        e.preventDefault();
        switch (this.state.forAct) {
            case 'Delete':
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


    doCreate = async (e) => {
        await addDockStatusService(this.state.dockStatusCode, this.state.dockStatusName);
        this.props.history.push({
            pathname: '/protected/main/masterDockStatus'
        })
    };

    doUpdateAct = async (e) => {
        await updateDockStatusService(this.state.dockStatusCode, this.state.dockStatusName);
        this.props.history.push({
            pathname: '/protected/main/masterDockStatus'
        })
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterDockStatus'
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
                                        class="fas fa-clipboard-list"></i> {`Master Dock Status ${this.state.forAct}`}
                                    </h5></div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <form onSubmit={this.doUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="harborCode">Dock Status Code</label>
                                        <input type="text" value={this.state.dockStatusCode} className="form-control"
                                               id="categoryId" readOnly={this.state.forAct === 'Update'}
                                               onChange={this.onInputDockStatusCodeChange}
                                               required
                                               disabled={this.state.forAct === 'Delete' || this.state.forAct === 'Create'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harborName">Dock Status Name</label>
                                        <input type="text" value={this.state.dockStatusName} className="form-control"
                                               id="categoryName" onChange={this.onInputDockStatusNameChange}
                                               required
                                               disabled={this.state.forAct === 'Delete'}/>
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
//     return {updateDockStatus: state.updateDockStatus};
// };

export default (MasterDockStatusUpdate);