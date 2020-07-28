import React from 'react';
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";
import {getListCategoryService} from "../../api/category";
import {setListCategoryAction, updateCategoryAction} from "../../actions/category";

class MasterCategory extends React.Component {
    componentDidMount() {
        this.doGetListCategory();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };

    doGetListCategory = async () => {
        const response = await getListCategoryService();
        const data = await response.json();
        this.props.setListCategoryAction(data);
    };

    doUpdateCategory = (category) => {
        this.props.updateCategoryAction(category);
        this.props.history.push({pathname: '/protected/main/masterCategoryUpdate', state: {forAct: 'Update'}})
    };

    doDeleteCategory = (category) => {
        this.props.updateCategoryAction(category);
        this.props.history.push({pathname: '/protected/main/masterCategoryUpdate', state: {forAct: 'Delete'}})
    };
    
    doAddCategory = () => {
        this.props.history.push({pathname: '/protected/main/masterCategoryUpdate', state: {forAct: 'Create'}})
    };

    doRenderListCategory = () => {
        if (this.props.listCategory) {
            return this.props.listCategory.map((category) => {
                return (
                    <tr key={category.categoryId}>
                        <td>{category.categoryId}</td>
                        <td>{category.categoryName}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateCategory(category)
                            }}><i className="fas fa-edit"></i>
                            </button>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doDeleteCategory(category)
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
                        <h5 className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><i class="fas fa-clipboard-list"></i> Master Category</div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </h5>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddCategory}><i className="fas fa-plus"></i> New Category</button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Category ID</td>
                                    <td>Category Name</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListCategory()}
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
    return {listCategory: state.listCategory};
};

const mapDispatchToProps = {
    setListCategoryAction: setListCategoryAction,
    updateCategoryAction: updateCategoryAction
};
export default connect(mapStateToProps, mapDispatchToProps)(MasterCategory);