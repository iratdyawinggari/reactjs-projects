import React from 'react';

class TransactionDetail extends React.Component {
    state = {totaltrx:0}
    onBuy = (transaction) => {
        let lasttrx = JSON.parse(window.localStorage.getItem('trx'));
        const totaltrx = this.state.totaltrx;
        let mymoney=JSON.parse(window.localStorage.getItem('money'));
        if(lasttrx) {
            if(transaction.id !=='4'){
                mymoney = { initialAmount: mymoney.initialAmount,remains:mymoney.remains-totaltrx};
                if(mymoney.remains < '0'){
                    alert('saldo anda tidak cukup, silahkan isi saldo')
                    this.props.history.push({pathname:"/Menu"});
                }else{
                    window.localStorage.setItem('money',JSON.stringify(mymoney))
                    window.localStorage.setItem('trx', JSON.stringify([...lasttrx, {transaction: transaction, totaltrx:-totaltrx}]));
                }
            }else{
                window.localStorage.setItem('money',JSON.stringify(mymoney))
                window.localStorage.setItem('trx', JSON.stringify([...lasttrx, {transaction: transaction, totaltrx:totaltrx}]));
            }
        } else {
            if(transaction.id !=='4'){
                mymoney = { initialAmount: mymoney.initialAmount,remains:mymoney.remains-totaltrx};
                if(mymoney.remains < '0'){
                    alert('saldo anda tidak cukup, silahkan isi saldo')
                    this.props.history.push({pathname:"/Menu"});
                }else{
                    window.localStorage.setItem('money',JSON.stringify(mymoney))
                    lasttrx = [{ transaction: transaction,totaltrx:-totaltrx}];
                    window.localStorage.setItem('trx', JSON.stringify(lasttrx));
                }
            }else{
                window.localStorage.setItem('money',JSON.stringify(mymoney))
                lasttrx = [{ transaction: transaction,totaltrx:totaltrx}];
                window.localStorage.setItem('trx', JSON.stringify(lasttrx));
            }
        }
        this.props.history.push({pathname:"/Menu"});
    };

    doInputTrxChange= (event) => {
        this.setState({totaltrx : event.target.value});
        console.log(this.state.totaltrx)
    };

    onRenderProductInfo = (transaction) => {
        if(transaction) {
            return(
                <div className="card-footer bg-transparent">
                    <div className="d-flex justify-content-end">
                    <div className="card-body">
                        <h5 className="card-title">{transaction.TransactionName}</h5>

                        <div className="form-group">
                            <input type="text" className="form-control" placeholder = 'qty' onChange={this.doInputTrxChange}/>
                        </div>
                        <div className="form-group">
                            <button type="button" className="form-control btn btn"
                            onClick={() => {
                                this.onBuy(transaction)
                            }}>Confirm
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    }
    render(){
        let transaction;
        if(!this.props.history.location.state) {
            this.props.history.push({pathname: '/'});
        } else {
            transaction = this.props.history.location.state.transaction;
        }
        return(
            <div className='container'>
                {this.onRenderProductInfo(transaction)}
            </div>
        )
    }
}

export default TransactionDetail;