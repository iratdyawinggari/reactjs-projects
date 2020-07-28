import React from 'react';
import{connect} from 'react-redux';

class Display extends React.Component{

    render(){
        return(
            <div>
                <input type="text" placeholder ="result" value={this.props.calculator} />
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{calculator:state.calculator}
}


export default connect(mapStateToProps)(Display);
