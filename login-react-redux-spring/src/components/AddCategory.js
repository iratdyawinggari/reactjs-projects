import React from 'react';
import { insertCategory } from '../api/category'
import { connect } from 'react-redux'


class AddCategory extends React.Component{
    state={
        categoryName:''
    }

    onCategoryChange = async (event) => {
        await this.setState({ categoryName: event.target.value })
    }

    doAddCategory = async () =>{
        await insertCategory(this.state.categoryName)
        await this.props.history.push({
            pathname:'/Category'
        })
    }

    doBackToCategory=async() => {
        await this.props.history.push({
            pathname:'/Category'
        })
    }

    render() {
        return (
           <div className='container'>
               <div>
                   <div >
                       <h3>Add Category</h3>
                   </div>
                   <div >
                       <div class="form-group row">
                           <label for="inputPassword3" class="col-sm-2 col-form-label">insert Category Name</label>
                            <div class="col-sm-9">
                               <input type="text" class="form-control" id="inputPassword3" placeholder="Category Name" onKeyPress={this.onKeyCategory} onChange={this.onCategoryChange} />
                           </div>
                       </div>
                       <button onClick={this.doAddCategory}>Insert</button>
                       <button onClick={this.doBackToCategory}>Back</button>
                   </div>
               </div>
           </div>
       )
   }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.user
    }
}

export default connect(mapStateToProps) (AddCategory)