import React from 'react';
import { getCategory } from '../api/category'
import { connect } from 'react-redux'
import { addCategory} from '../actions/'

class Category extends React.Component {

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


   render(){
        let listCategory = this.props.listCategory.map((c) => {
            const { categoryId, categoryName } = c
            return (
                <tr>
                    <td>{categoryId}</td>
                    <td>{categoryName}</td>
                </tr>
            )
        })

        return(
            <div className="container">
                <h2>Daftar Category</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
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
        listCategory: state.category
    }
}

export default connect(mapStateToProps, { addCategory: addCategory })(Category)