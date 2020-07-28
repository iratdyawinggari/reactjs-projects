import React from 'react';
import{connect} from 'react-redux';
import {penjumlahan,pengurangan,pengalian,pembagian} from '../action';


class Keypad extends React.Component{
    state={
        firstnumber:0,
        secondnumber:0,
    }

    onFirstNumberChange = async (event) => {
        await this.setState({ firstnumber: event.target.value })
        console.log(this.state.firstnumber)
    }

    onSecondNumberChange = async (event) => {
        await this.setState({ secondnumber: event.target.value })
        console.log(this.state.secondnumber)
    }

    render(){
        return(
            <div>
                <div>
                    input first number:
                    <input type="text" placeholder="first number" onChange={this.onFirstNumberChange} />
                </div>
                <div>
                    input second number:
                    <input type="text" placeholder="second number" onChange={this.onSecondNumberChange}/>
                </div>
                <div>
                    <button onClick={()=>{this.props.penjumlahan(this.state.firstnumber,this.state.secondnumber)}}>+</button>
                </div>
                <div>
                    <button onClick={()=>{this.props.pengurangan(this.state.firstnumber,this.state.secondnumber)}}>-</button>
                </div>
                <div>
                    <button onClick={()=>{this.props.pengalian(this.state.firstnumber,this.state.secondnumber)}}>*</button>
                </div>
                <div>
                    <button onClick={()=>{this.props.pembagian(this.state.firstnumber,this.state.secondnumber)}}>/</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{calculator:state.calculator}
}

export default connect(mapStateToProps,{penjumlahan:penjumlahan,pengurangan:pengurangan,pengalian:pengalian,pembagian:pembagian})(Keypad);