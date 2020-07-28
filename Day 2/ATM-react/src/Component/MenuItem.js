import React from 'react';

class MenuItem extends React.Component {
    doShowDetail = (transaction) => {
        this.props.onShowDetail(transaction);
    };

    render() {
        return(
            <div >
                <div >
                    <button className="btn btn-info" onClick={() =>{
                    this.doShowDetail(this.props.transaction)}}>{this.props.transaction.TransactionName}</button>
                </div>
            </div>
        )
    }
}
export default MenuItem;