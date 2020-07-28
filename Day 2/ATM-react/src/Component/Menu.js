import React from 'react';
import MenuItem from './MenuItem';
import {Link} from 'react-router-dom';

class ProductCatalog extends React.Component {
    onShowDetail = (transaction) => {
        this.props.history.push({pathname: '/TransactionDetail', state: {transaction: transaction}});
    }

    render(){
        const MenuList = [
            {id: '1', TransactionName: 'Tarik Tunai'},
            {id: '2', TransactionName: 'Transfer'},
            {id: '3', TransactionName: 'Pembayaran'},
            {id: '4', TransactionName: 'Setor Tunai'}
        ];
        let MenuItemList = MenuList.map((t) => {
            return <MenuItem key={t.id} transaction={t} onShowDetail={this.onShowDetail}/>
        });
        return(
            <div className="container">
                <Link  to="/CekSaldo" className="btn btn-info">CekSaldo</Link>
                {MenuItemList}
                <Link to="/Report" className="btn btn-info">Report</Link>
            </div>
        )
    }
}
export default ProductCatalog;