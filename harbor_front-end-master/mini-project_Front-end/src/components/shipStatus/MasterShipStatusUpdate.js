import React from 'react';
import MainContent from "../mainContent/MainContent";
import {addShipStatusService, updateShipStatusService} from "../../api/shipStatus";

class MasterShipStatusUpdate extends React.Component {
    state = {shipStatusCode: '', shipStatusName: '', forAct: ''};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                shipStatusCode: this.props.history.location.state.shipStatus.shipStatusId,
                shipStatusName: this.props.history.location.state.shipStatus.shipStatusName,
                forAct: this.props.history.location.state.forAct
            })
        }
    }

    onInputShipStatusCodeChange = (event) => {
        this.setState({shipStatusCode: event.target.value})
    };
    onInputShipStatusNameChange = (event) => {
        this.setState({shipStatusName: event.target.value})
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

    doUpdateAct = async (e) => {
        await updateShipStatusService(this.state.shipStatusCode, this.state.shipStatusName);
        this.props.history.push({
            pathname: '/protected/main/masterShipStatus'
        })
    };

    doCreate = async (e) => {
        await addShipStatusService(this.state.shipStatusCode, this.state.shipStatusName);
        this.props.history.push({
            pathname: '/protected/main/masterShipStatus'
        })
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterShipStatus'
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
                                        class="fas fa-clipboard-list"></i> {`Master Ship ${this.state.forAct}`}</h5>
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
                                        <label htmlFor="harborCode">Ship Status Code</label>
                                        <input type="text" value={this.state.shipStatusCode} className="form-control"
                                               id="categoryId" readOnly={this.state.forAct === 'Update'}
                                               onChange={this.onInputShipStatusCodeChange}
                                               required
                                               disabled={this.state.forAct === 'Delete' || this.state.forAct === 'Create'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harborName">Ship Status Name</label>
                                        <input type="text" value={this.state.shipStatusName} className="form-control"
                                               id="categoryName" onChange={this.onInputShipStatusNameChange}
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
//     return {updateShipStatus: state.updateShipStatus};
// };

export default (MasterShipStatusUpdate);