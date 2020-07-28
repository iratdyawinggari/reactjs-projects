import React from 'react';
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";

class MasterCategoryUpdate extends React.Component {
    state = {categoryId: '', categoryName: '', forAct: ''};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                categoryId: this.props.updateCategory.categoryId,
                categoryName: this.props.updateCategory.categoryName,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputCategoryIdChange = (event) => {
        this.setState({categoryId: event.target.value})
    };
    onInputCategoryNameChange = (event) => {
        this.setState({categoryName: event.target.value})
    };

    doUpdate = (e) => {
        switch (this.state.forAct) {
            case 'Delete':
                break;
            case 'Update':
                break;
            case 'Create':
                break;
            default:
                break;
        }
    };

    doCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/masterCategory'
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
                                    <div className='flex-grow-1'><h5><i class="fas fa-clipboard-list"></i> {`Master Category ${this.state.forAct}`}</h5></div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <div className="form-group">
                                    <label htmlFor="categoryId">Category ID</label>
                                    <input type="text" value={this.state.categoryId} className="form-control"
                                           id="categoryId" onChange={this.onInputCategoryIdChange}
                                           disabled={this.state.forAct === 'Delete'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoryName">Category Name</label>
                                    <input type="text" value={this.state.categoryName} className="form-control"
                                           id="categoryName" onChange={this.onInputCategoryNameChange}
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
    return {updateCategory: state.updateCategory};
};

export default connect(mapStateToProps)(MasterCategoryUpdate);