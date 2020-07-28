import React from 'react';
import {getListCategoryService} from "../../api/category";
import {selectCategoryAction, setListCategoryAction} from "../../actions/category";
import {connect} from "react-redux";

class MasterCategorySelection extends React.Component {
    componentDidMount() {
        this.doGetListCategory();
    }

    doGetListCategory = async () => {
        const response = await getListCategoryService();
        const data = await response.json();
        this.props.setListCategoryAction(data);
    };

    doRenderCategory = () => {
        if (this.props.listCategory) {
            return this.props.listCategory.map((category) => {
                return (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
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

    onSelectCategory = (event) => {
        this.props.selectCategoryAction(event.target.value)
    };


    render() {
        return (
            <select className="custom-select" disabled={this.props.disabled}
                    value={this.props.selectCategory ? this.props.selectCategory : ''}
                    onChange={this.onSelectCategory}>
                <option>Open this select menu</option>
                {this.doRenderCategory()}
            </select>
        )
    }
}

const mapStateToProps = (state) => {
    return {selectCategory: state.selectCategory, listCategory: state.listCategory};
};

const mapDispatchToProps = {
    setListCategoryAction: setListCategoryAction,
    selectCategoryAction: selectCategoryAction
};
export default connect(mapStateToProps, mapDispatchToProps)(MasterCategorySelection);