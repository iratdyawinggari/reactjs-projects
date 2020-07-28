import React from 'react';
import { getProduct,deleteProduct,searchProductByProductId } from '../api/product'
import { connect } from 'react-redux'
import { addProduct,updateProductAction} from '../actions/'

class Product extends React.Component {

    closeProduct = () => {
        this.props.history.push({
            pathname: '/MainContent'
        })
    }

    getDataJson = async () => {
        const response = await getProduct();
        const data = await response.json()
        this.props.addProduct(data)
        console.log(this.props.listProduct)
    }

    componentDidMount() {
        this.getDataJson()
    }

    doDeleteProduct = async (event) =>{
        console.log(event.target.id)
        const deleteId=event.target.id
        await deleteProduct(event.target.id)
        this.getDataJson()
        // this.props.history.push({
        //     pathname: '/Product'
        // })
    }

    doInsertProduct=() => {
        this.props.history.push({
            pathname: '/AddProduct'
        })
    }

    doUpdateProduct= async (event)=>{
        const response = await searchProductByProductId(event.target.id);
        const data = await response.json()
        console.log(data)
        await this.props.updateProductAction(data)
        console.log(this.props.updateProduct)
        this.props.history.push({
            pathname: '/UpdateProduct'
        })

    }

    render(){

        let listProduct = this.props.listProduct.map((p) => {
            const { productId, productName,price,category:{id,categoryName}} = p
            return (
                <tr>
                    <td>{productId}</td>
                    <td>{productName}</td>
                    <td>{price}</td>
                    <td>{categoryName}</td>

                    <td>
                        <button type="button" class="btn btn-danger" id={productId} onClick={this.doDeleteProduct}> Delete</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-success" id={productId} onClick={this.doUpdateProduct}>Update</button>
                    </td>

                </tr>
            )
        })

        return(
            <div className="container">
                <h2>Daftar Product</h2>
                <button onClick={this.doInsertProduct}>Insert</button>
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Category Name</th>
                            <th colSpan={'2'}>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary" onClick={this.closeProduct}>Back</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listProduct: state.product,
        updateProduct: state.updateProduct
    }
}

export default connect(mapStateToProps, { addProduct: addProduct,updateProductAction:updateProductAction })(Product)