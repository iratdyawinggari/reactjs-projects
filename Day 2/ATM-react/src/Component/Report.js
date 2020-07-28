import React from 'react';
import {Link} from 'react-router-dom';

class Report extends React.Component {
    state = {
        isiTransaction: [],
        infoSaldo: []
    }
    onCancel = () => {
        window.localStorage.clear();
        this.setState({isiTransaction: []});
    };

    componentDidMount() {
        const trx = JSON.parse(window.localStorage.getItem('trx'));
        const saldo = JSON.parse(window.localStorage.getItem('money'));
        if(saldo){
            this.setState({
                infoSaldo: saldo
            })
        }

        console.log(trx)
        if(trx){
            this.setState({isiTransaction: trx});
        }
        console.log(this.state.isiTransaction)
    }

    render(){
        let totalTrx = 0;

        if(this.state.isiTransaction.length > 0) {
            let listTransaction = this.state.isiTransaction.map((k) => {
                const {transaction, totaltrx} = k;
                totalTrx = totalTrx + Number(totaltrx);
                // totalPrice = totalPrice + (Number(totaltrx) * Number(product.price));
                return (
                <tr>
                    <td>{transaction.id}</td>
                    <td>{transaction.TransactionName}</td>
                    <td>{totaltrx}</td>
                    {/* <td>{Number(qty) * Number(product.price)}</td> */}
                </tr>
                )
            });

            return(
                <div className="container">
                    <h2>Daftar Transaksi Anda</h2>
                    <h3>Saldo awal : {this.state.infoSaldo.initialAmount}</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Transaction</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTransaction}
                            <tr>
                                <td></td>
                                <td style={{textAlign: 'right'}}>Total : </td>
                                <td>{totalTrx}</td>
                                {/* <td>{totalPrice}</td> */}
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{textAlign: 'right'}}>Saldo Awal : </td>
                                <td>{this.state.infoSaldo.initialAmount}</td>
                                {/* <td>{totalPrice}</td> */}
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{textAlign: 'right'}}>Sisa Saldo : </td>
                                <td>{this.state.infoSaldo.remains}</td>
                                {/* <td>{totalPrice}</td> */}
                            </tr>
                            <tr>
                                <td colSpan="4" style={{textAlign: 'right'}}>
                                    <button type="button" className="btn btn-success mr-2">Bayar</button>
                                    <button type="button" className="btn btn-danger" onClick={this.onCancel}>Batal</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return(
                <div className="container">
                    <h2>Daftar Transaksi anda kosong</h2>
                    <Link to="/Menu">Mulai Belanja</Link>
                </div>
            )
        }
    }
}
export default Report;