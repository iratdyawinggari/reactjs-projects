import React from 'react';
import { getProduct } from '../api/product'
import { connect } from 'react-redux'
import { addProduct} from '../actions/'

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
    }

    componentDidMount() {
        this.getDataJson()
    }


   render(){
        let listProduct = this.props.listProduct.map((p) => {
            const { productId, productName } = p
            return (
                <tr>
                    <td>{productId}</td>
                    <td>{productName}</td>
                </tr>
            )
        })

        return(
            <div className="container">
                <h2>Daftar Product</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
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
        listProduct: state.product
    }
}

export default connect(mapStateToProps, { addProduct: addProduct })(Product)