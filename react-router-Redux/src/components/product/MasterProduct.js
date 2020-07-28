import React from 'react';
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";
import {setListProductAction, updateProductAction} from "../../actions/product/index";
import {getListProductService} from "../../api/product/index";
import {selectCategoryAction} from "../../actions/category";

class MasterProduct extends React.Component {
    componentDidMount() {
        this.doGetListProduct();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };

    doGetListProduct = async () => {
        const response = await getListProductService();
        const data = await response.json();
        this.props.setListProductAction(data);
    };

    doUpdateProduct = (product) => {
        this.props.updateProductAction(product);
        this.props.selectCategoryAction(product.category.categoryId);
        this.props.history.push({pathname: '/protected/main/masterProductUpdate', state: {forAct: 'Update'}})
    };

    doDeleteProduct = (product) => {
        this.props.updateProductAction(product);
        this.props.selectCategoryAction(product.category.categoryId);
        this.props.history.push({pathname: '/protected/main/masterProductUpdate', state: {forAct: 'Delete'}})
    };

    doAddProduct = () => {
        this.props.selectCategoryAction('')
        this.props.history.push({pathname: '/protected/main/masterProductUpdate', state: {forAct: 'Create'}})
    };

    doRenderListProduct = () => {
        if (this.props.listProduct) {
            return this.props.listProduct.map((product) => {
                return (
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.productName}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateProduct(product)
                            }}><i className="fas fa-edit"></i>
                            </button>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doDeleteProduct(product)
                            }}><i className="fas fa-trash"></i>
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
                        <div className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><h5><i class="fas fa-dolly-flatbed"></i>  Master Product</h5></div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddProduct}><i
                                className="fas fa-plus"></i> New Product
                            </button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Product ID</td>
                                    <td>Product Name</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListProduct()}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </MainContent>
        )
    }
}

const mapStateToProps = (state) => {
    return {listProduct: state.listProduct};
};

const mapDispatchToProps = {
    setListProductAction: setListProductAction,
    updateProductAction: updateProductAction,
    selectCategoryAction:selectCategoryAction
};
export default connect(mapStateToProps, mapDispatchToProps)(MasterProduct);