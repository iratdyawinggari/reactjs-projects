import React from 'react';
import { connect } from 'react-redux'
import { insertProduct} from '../api/product'
import { getCategory,searchCategoryById} from '../api/category'
import { addCategory} from '../actions/'
import { async } from 'q';
class AddCategory extends React.Component{
    state={
        productId:'',
        productName:'',
        price:'',
        categoryId:1,
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

    // doAddCategory = async () =>{
    //     await insertCategory(this.state.categoryName)
    // }

    doAddProduct = async () =>{
        const response = await searchCategoryById(this.state.categoryId);
        const category = await response.json()
        await insertProduct(this.state.productId,this.state.productName,this.state.price,category)
        console.log(category)
    }


    doBackToCategory=async() => {
        await this.props.history.push({
            pathname:'/Category'
        })
    }

    getCategoryDataJson = async () => {
        const response = await getCategory();
        const data = await response.json()
        this.props.addCategory(data)
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
                               <input type="text" class="form-control" id="inputPassword3" placeholder="Product Id" defaultValue={this.state.productId} onChange={this.onProductIdChange} />
                            </div>

                            <label for="inputPassword3" class="col-sm-2 col-form-label">insert Product Name</label>
                            <div class="col-sm-9">
                               <input type="text" class="form-control" id="inputPassword3" placeholder="Product Name" onChange={this.onProductNameChange} />
                            </div>
                            <label for="inputPassword3" class="col-sm-2 col-form-label">insert price</label>
                            <div class="col-sm-9">
                               <input type="text" class="form-control" id="inputPassword3" placeholder="Price" onChange={this.onPriceChange} />
                            </div>

                           <select className="custom-select" value={this.state.categoryId} onChange={this.doChangeSelectCategory}>
                           {listCategory}
                           </select>
                       </div>
                       <button onClick={this.doAddProduct}>Insert</button>
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
        listCategory: state.category
    }
}

export default connect(mapStateToProps,{ addCategory: addCategory}) (AddCategory)