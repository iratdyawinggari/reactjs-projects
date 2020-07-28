import React from 'react';
import { updateProduct } from '../api/product'
import { connect } from 'react-redux'
import { getCategory,searchCategoryById} from '../api/category'
import { addCategory} from '../actions/'

class UpdateProduct extends React.Component{
    state={
        productId:this.props.updateProduct.productId,
        productName:this.props.updateProduct.productName,
        price:this.props.updateProduct.price,
        categoryId: 1
    }

    onProductIdChange = async (event) => {
        await this.setState({ productId: event.target.value })
    }

    onProductNameChange = async (event) => {
        await this.setState({ productName: event.target.value })
    }

    onPriceChange = async (event) => {
        await this.setState({ price: event.target.value })
    }

    doBackToProduct=async() => {
        await this.props.history.push({
            pathname:'/Product'
        })
    }

    test=()=>{
        console.log(this.props.updateProduct)
    }

    getCategoryDataJson = async () => {
        const response = await getCategory();
        const data = await response.json()
        this.props.addCategory(data)
    }

    doUpdateProduct = async () =>{
        const response = await searchCategoryById(this.state.categoryId);
        const category = await response.json()
        await updateProduct(this.state.productId,this.state.productName,this.state.price,category)
        console.log(category)
    }

    componentDidMount() {
        this.getCategoryDataJson()
    }

    doChangeSelectCategory=async (event)=>{
        await this.setState({
            categoryId:event.target.value
        })
        console.log(this.state.categoryId)
    }


    render() {
        let listCategory = this.props.listCategory.map((c) => {
            const { id, categoryName } = c
            return (
                    <option value={id}>{categoryName}</option>
            )
        })
        return (
            <div className='container'>
                <div>
                    <div >
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">insert Product Id</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputPassword3" defaultValue={this.props.updateProduct.productId} placeholder="Product Id" onChange={this.onProductIdChange} />
                            </div>

                            <label for="inputPassword3" class="col-sm-2 col-form-label">insert Product Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputPassword3" placeholder="Product Name" defaultValue={this.props.updateProduct.productName} onChange={this.onProductNameChange} />
                            </div>
                            <label for="inputPassword3" class="col-sm-2 col-form-label">insert price</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputPassword3" placeholder="Price" defaultValue={this.props.updateProduct.price} onChange={this.onPriceChange} />
                            </div>

                            <select className="custom-select" value={this.state.categoryId} onChange={this.doChangeSelectCategory}>
                                {listCategory}
                            </select>
                        </div>
                        <button onClick={this.doUpdateProduct}>Update</button>
                        <button onClick={this.doBackToProduct}>Back</button>
                    </div>
                </div>
            </div>
        )
   }
}
const mapStateToProps = (state) => {
    console.log(state.email)
    return {
        updateProduct: state.updateProduct,
        listCategory: state.category
    }
}

export default connect(mapStateToProps,{addCategory: addCategory}) (UpdateProduct)