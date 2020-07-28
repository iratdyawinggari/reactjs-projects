import React from 'react';
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";
import MasterCategorySelection from "../category/MasterCategorySelection";

class MasterProductUpdate extends React.Component {
    state = {productId: '', productName: '', category: '', forAct: ''};

    componentDidMount() {
        const forAct = this.props.history.location.state.forAct;
        if (forAct === 'Create') {
            this.setState({
                forAct: this.props.history.location.state.forAct
            })
        } else {
            this.setState({
                productId: this.props.updateProduct.productId,
                productName: this.props.updateProduct.productName,
                forAct: this.props.history.location.state.forAct
            })
        }

    }

    onInputProductIdChange = (event) => {
        this.setState({productId: event.target.value})
    };
    onInputProductNameChange = (event) => {
        this.setState({productName: event.target.value})
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
            pathname: '/protected/main/masterProduct'
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
                                    <div className='flex-grow-1'><h5><i class="fas fa-dolly-flatbed"></i>  {`Master Product ${this.state.forAct}`}</h5></div>
                                    <div>
                                        <button className="btn btn-link" onClick={this.doCancel}><i
                                            className="fas fa-2x fa-times-circle"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-text">
                                <div className="form-group">
                                    <label htmlFor="productId">Product ID</label>
                                    <input type="text" value={this.state.productId} className="form-control"
                                           id="productId" onChange={this.onInputProductIdChange}
                                           disabled={this.state.forAct === 'Delete'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productName">Product Name</label>
                                    <input type="text" value={this.state.productName} className="form-control"
                                           id="productName" onChange={this.onInputProductNameChange}
                                           disabled={this.state.forAct === 'Delete'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="productName">Category</label>
                                    <MasterCategorySelection disabled={this.state.forAct === 'Delete'}/>
                                </div>
                            </div>
                            <div className='d-flex flex-row-reverse '>
                                <div className="btn-group" role="group" aria-label="Basic example">
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
    return {updateProduct: state.updateProduct, selectCategory: state.selectCategory};
};

export default connect(mapStateToProps)(MasterProductUpdate);