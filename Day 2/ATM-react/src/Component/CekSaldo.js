import React from 'react';
import {Link} from 'react-router-dom';

class CekSaldo extends React.Component{
    state = {money: []}


    componentDidMount() {
        const infoSaldo = JSON.parse(window.localStorage.getItem('money'));
        console.log(infoSaldo)
        if(infoSaldo){
            this.setState({money: infoSaldo});
        }
        console.log(this.state.money)
    }

    render(){
        return(
            <div>
                <div>Sisa Saldo: {this.state.money.remains}</div>
                <Link to="/Menu"> Back</Link> 
            </div>
        )
    }

}

export default CekSaldo;


