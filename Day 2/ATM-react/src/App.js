import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import Login from './Component/Login';
import Menu from './Component/Menu';
import TransactionDetail from './Component/transactionDetail';
import Report from './Component/Report';
import CekSaldo from './Component/CekSaldo';

// import Header from './Component/Header';
// import ProductDetail from './Component/ProductDetail';
// import ProductCatalog from './Component/ProductCatalog';
// import Payment from './Component/Payment';

class App extends React.Component{
    constructor() {
        super()
        this.state = { statusLogin: false, pin: "" }
    }

    setStatusLogin = (bol) => {
        this.setState({ statusLogin: bol })
    }
    
    setPin = (input) => {
        this.setState({ pin: input })
    }

    render() {
        return(
            <div>
                <HashRouter>
                    {/* <Header qty={this.state.qty}/> */}
                    <div>
                        {/* <Route path="/" exact render={(props) => { return <ProductCatalog  {...props}  /> }} /> */}
                        <Route path="/" exact render={(props) => { return <Login pin={this.setPin} {...props} setLogin={this.setStatusLogin} /> }} />

                        <Route path="/Menu" exact render={(props) => {  return this.state.statusLogin ?
                                <Menu pin={this.setPin} {...props} setLogin={this.setStatusLogin}/> : <Redirect to="/" />                    
                        }}/>

                        <Route path="/CekSaldo" exact render={(props) => {  return this.state.statusLogin ?
                                <CekSaldo pin={this.setPin} {...props} setLogin={this.setStatusLogin}/> : <Redirect to="/" />                    
                        }}/>

                        <Route path="/TransactionDetail" exact render={(props) => {  return this.state.statusLogin ?
                                <TransactionDetail pin={this.setPin} {...props} setLogin={this.setStatusLogin}/> : <Redirect to="/" />                    
                        }}/>

                        <Route path="/Report" exact render={(props) => <Report pin={this.setPin} {...props} setLogin={this.setStatusLogin} updateQty={this.doUpdateQtyHeader}/>}/>

                    </div>
                </HashRouter>
            </div>
        )
    }
}
export default App;