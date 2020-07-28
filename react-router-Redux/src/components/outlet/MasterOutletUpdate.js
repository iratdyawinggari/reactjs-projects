import React from 'react';
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";
import {addOutletService} from "../../api/outlet"

class MasterOutletUpdate extends React.Component {
    state = {outletId: '', outletName: '', forAct: ''};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {

            this.setState({
                forAct: this.props.history.location.state.forAct
            })

        } else {
            this.setState({
                outletId: this.props.updateOutlet.outletId,
                outletName: this.props.updateOutlet.outletName,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputOutletIdChange = (event) => {
        this.setState({outletId: event.target.value})
    };
    onInputOutletNameChange = (event) => {
        this.setState({outletName: event.target.value})
    };

    doUpdate = (e) => {
        switch (this.state.forAct) {
            case 'Delete':
                break;
            case 'Update':
                break;
            case 'Create':
                if(this.state.outletId.length>0&& this.state.outletName.length>0){
                    addOutletService(this.state.outletId,this.state.outletName)
                }
            break;
            default:
                break;
        }
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterOutlet'
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
                                    <div className='flex-grow-1'><h5><i class="fas fa-clipboard-list"></i> {`Master Outlet ${this.state.forAct}`}</h5></div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <div className="form-group">
                                    <label htmlFor="outletId">Outlet ID</label>
                                    <input type="text" value={this.state.outletId} className="form-control"
                                           id="outletId" onChange={this.onInputOutletIdChange}
                                           disabled={this.state.forAct === 'Delete'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="outletName">Outlet Name</label>
                                    <input type="text" value={this.state.outletName} className="form-control"
                                           id="outletName" onChange={this.onInputOutletNameChange}
                                           disabled={this.state.forAct === 'Delete'}/>
                                </div>
                            </div>
                            <div className='d-flex flex-row-reverse '>
                                <div className="btn-group " role="group" aria-label="Basic example">
                                    <button className="btn btn-primary awesome-button-lg" onClick={this.doUpdate}>
                                        {this.state.forAct === 'Delete' ? 'Yes, sure delete it' : 'Save'}
                                    </button>
                                    <button className="btn btn-danger awesome-button-lg" onClick={this.doCancel}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContent>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {updateOutlet: state.updateOutlet};
};

export default connect(mapStateToProps)(MasterOutletUpdate);