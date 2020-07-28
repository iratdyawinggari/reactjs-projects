import React from 'react';
import { updateCategory } from '../api/category'
import { connect } from 'react-redux'


class UpdateCategory extends React.Component{
    state={
        id:this.props.updateCategory.id,
        categoryName:this.props.updateCategory.categoryName
    }

    onCategoryChange = async (event) => {

        await this.setState({ categoryName: event.target.value })
        console.log(this.state.categoryName)
    }

    doUpdateCategory = async () =>{
        await updateCategory(this.props.updateCategory.id,this.state.categoryName)
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
                       <h3>Update Category</h3>
                   </div>
                   <div >
                       <div class="form-group row">
                           <label for="inputPassword3" class="col-sm-2 col-form-label">Category Id</label>
                           <div class="col-sm-9">
                               <input type="text" class="form-control" id="inputPassword3" readOnly  value={this.props.updateCategory.id} />
                           </div>
                           <label for="inputPassword3" class="col-sm-2 col-form-label">Category Name</label>
                           <div class="col-sm-9">
                               <input type="text" class="form-control" id="inputPassword3" defaultValue={this.props.updateCategory.categoryName} placeholder="Category Name" onChange={this.onCategoryChange} />
                           </div>
                       </div>
                       <button onClick={this.doUpdateCategory}>Update</button>
                       <button onClick={this.doBackToCategory}>Back</button>
                   </div>
               </div>
           </div>
       )
   }
}
const mapStateToProps = (state) => {
    console.log(state.email)
    return {
        updateCategory: state.updateCategory
    }
}

export default connect(mapStateToProps) (UpdateCategory)