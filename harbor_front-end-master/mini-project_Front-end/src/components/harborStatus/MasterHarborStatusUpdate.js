import React from 'react';
import MainContent from "../mainContent/MainContent";
import {addHaborStatusService, updateHarborStatusService} from "../../api/harborStatus";

class MasterHarborStatusUpdate extends React.Component {
    state = {harborStatusCode: '', harborStatusName: '', forAct: ''};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                harborStatusCode: this.props.history.location.state.harborStatus.harborStatusId,
                harborStatusName: this.props.history.location.state.harborStatus.harborStatusName,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputharborStatusCodeChange = (event) => {
        this.setState({harborStatusCode: event.target.value})
    };
    onInputharborStatusNameChange = (event) => {
        this.setState({harborStatusName: event.target.value})
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

    doCreate = async (e) => {
        await addHaborStatusService(this.state.harborStatusCode, this.state.harborStatusName);
        this.props.history.push({
            pathname: '/protected/main/masterHarborStatus'
        })
    };

    doUpdateAct = async (e) => {
        await updateHarborStatusService(this.state.harborStatusCode, this.state.harborStatusName);
        this.props.history.push({
            pathname: '/protected/main/masterHarborStatus'
        })
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterHarborStatus'
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
                                        class="fas fa-clipboard-list"></i> {`Master Harbor Status ${this.state.forAct}`}
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
                                        <label htmlFor="harborCode">Harbor Status Code</label>
                                        <input type="text" value={this.state.harborStatusCode} className="form-control"
                                               id="categoryId" readOnly={this.state.forAct === 'Update'}
                                               onChange={this.onInputharborStatusCodeChange}
                                               required
                                               disabled={this.state.forAct === 'Delete' || this.state.forAct === 'Create'}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="harborName">Harbor Status Name</label>
                                        <input type="text" value={this.state.harborStatusName} className="form-control"
                                               id="categoryName" onChange={this.onInputharborStatusNameChange}
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
//     return {updateharborStatus: state.updateharborStatus};
// };

export default (MasterHarborStatusUpdate);