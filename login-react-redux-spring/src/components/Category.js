import React from 'react';
import { getCategory,deleteCategory,searchCategoryById } from '../api/category'
import { connect } from 'react-redux'
import { addCategory,updateCategoryAction} from '../actions/'

class Category extends React.Component {
    state ={
        refresh: 0
    }

    closeCategory = () => {
        this.props.history.push({
            pathname: '/MainContent'
        })
    }

    getDataJson = async () => {
        const response = await getCategory();
        const data = await response.json()
        this.props.addCategory(data)
    }

    componentDidMount() {
        this.getDataJson()
    }

    doDeleteCategory = async (event) =>{
        console.log(event.target.id)
        const deleteId=event.target.id
        await deleteCategory(event.target.id)
        this.setState({
            refresh:deleteId
        })
        this.getDataJson()
    }

    doInsertCategory=async(event) => {
        this.props.history.push({
            pathname: '/AddCategory'
        })

    }

    doUpdateCategory= async (event)=>{
        const response = await searchCategoryById(event.target.id);
        const data = await response.json()

        await this.props.updateCategoryAction(data)
        console.log(this.props)
        this.props.history.push({
            pathname: '/UpdateCategory'
        })
    }

    render(){
        let listCategory = this.props.listCategory.map((c) => {
            const { id, categoryName } = c
            return (
                <tr>
                    <td>{id}</td>
                    <td>{categoryName}</td>
                    <td>
                        <button type="button" class="btn btn-outline-danger" id={id} onClick={this.doDeleteCategory}> Delete</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-success" id={id} onClick={this.doUpdateCategory}>Update</button>
                    </td>
                </tr>
            )
        })

        return(
            <div className="container">
                <h2>Daftar Category</h2>
                <button onClick={this.doInsertCategory} class="btn btn-primary" margin='5px'>Insert</button>
                <p>*jika tidak bisa menghapus Category, hal ini dikarenakan category tersebut telah ber-relasi dengan product (foreign key)</p>
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCategory}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary" onClick={this.closeCategory}>Back</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.category,
        updateCategory: state.updateCategory
    }
}

export default connect(mapStateToProps, { addCategory: addCategory,updateCategoryAction:updateCategoryAction})(Category)