import React from 'react';
import MainContent from "../mainContent/MainContent";
import {
    getListTransactionPaginationService,
    getTransactionDoneService,
    searchTrxbyCaptainNameService,
    searchTrxbyDockNameService,
    searchTrxbyEntryDateService,
    searchTrxbyExitDateService,
    searchTrxbyHarborNameService,
    searchTrxbyShipNameService,
    searchTrxbyShipStatusNameService,
    searchTrxbyTransactionStatusNameService,
    searchTrxbyWeightService,
    searchTrxHeaderIdService,
    searchTrxIdService,
    sortTrxbyCaptainNameService,
    sortTrxbyDockNameService,
    sortTrxbyEntryDateService,
    sortTrxbyExitDateService,
    sortTrxbyHarborNameService,
    sortTrxbyIdService,
    sortTrxbyShipNameService,
    sortTrxbyShipStatusNameService,
    sortTrxbyTrxHeaderIdService,
    sortTrxbyTrxStatusNameService,
    sortTrxbyWeightService
} from "../../api/transaction";
import {nextPaging, pagination, paging, previousPaging, totalPages} from "../pagination/pagination";
import {getReportService} from "../../api/report";


class Transaction extends React.Component {

    state = {
        totalPages: [],
        currentPage: null,
        disable: true,
        listTransaction: [],
        status: '',
        trxField: [
            "id",
            "transactionHeaderId",
            "shipName",
            "entryDate",
            "exitDate",
            "harborName",
            "dockName",
            "captainName",
            "shipStatusName",
            "weight",
            "transactionStatusName",
        ],
        searchFieldTwo: '',
        searchFieldOne: '',
        searchType: '',
        sort: '',
        orderBy: ''
    };


    componentDidMount() {
        this.getTransactionData()
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };

    doGetListTransactionPaging = async (page, pageSize) => {
        console.log(this.state.sort);
        if (!this.state.sort) {
            let response;
            switch (this.state.searchType) {
                case 'id':
                    response = await searchTrxIdService(this.state.searchFieldOne, this.state.searchFieldTwo, page, pageSize);
                    console.log(this.state.searchField);
                    break;
                case 'transactionHeaderId':
                    response = await searchTrxHeaderIdService(this.state.searchFieldOne, page, pageSize);
                    break;
                case 'shipName':
                    response = await searchTrxbyShipNameService(this.state.searchFieldOne, page, pageSize);
                    break;
                case 'dockName':
                    response = await searchTrxbyDockNameService(this.state.searchFieldOne, page, pageSize);
                    break;
                case 'captainName':
                    response = await searchTrxbyCaptainNameService(this.state.searchFieldOne, page, pageSize);
                    break;
                case 'shipStatusName':
                    response = await searchTrxbyShipStatusNameService(this.state.searchFieldOne, page, pageSize);
                    break;
                case 'transactionStatusName':
                    response = await searchTrxbyTransactionStatusNameService(this.state.searchFieldOne, page, pageSize);
                    break;
                case 'weight':
                    response = await searchTrxbyWeightService(this.state.searchFieldOne, this.state.searchFieldTwo, page, pageSize);
                    break;
                case 'entryDate':
                    response = await searchTrxbyEntryDateService(this.state.searchFieldOne, this.state.searchFieldTwo, page, pageSize);
                    break;
                case 'exitDate':
                    response = await searchTrxbyExitDateService(this.state.searchFieldOne, this.state.searchFieldTwo, page, pageSize);
                    break;
                case 'harborName':
                    response = await searchTrxbyHarborNameService(this.state.searchFieldOne, page, pageSize);
                    break;
                default:
                    response = await getListTransactionPaginationService(page, pageSize);
                    break;
            }
            // const response = await getListTransactionPaginationService(page, pageSize);
            const data = await response.json();
            console.log(data);
            this.setState({listTransaction: data.content});
            return data
        } else {
            let response;
            console.log("cek cok");
            switch (this.state.orderBy) {
                case 'id':
                    response = await sortTrxbyIdService(this.state.sort, page, pageSize);
                    break;
                case 'transactionHeaderId':
                    response = await sortTrxbyTrxHeaderIdService(this.state.sort, page, pageSize);
                    break;
                case 'harborName':
                    response = await sortTrxbyHarborNameService(this.state.sort, page, pageSize);
                    break;
                case 'shipName':
                    response = await sortTrxbyShipNameService(this.state.sort, page, pageSize);
                    break;
                case 'dockName':
                    response = await sortTrxbyDockNameService(this.state.sort, page, pageSize);
                    break;
                case 'weight':
                    response = await sortTrxbyWeightService(this.state.sort, page, pageSize);
                    break;
                case 'entryDate':
                    response = await sortTrxbyEntryDateService(this.state.sort, page, pageSize);
                    break;
                case 'exitDate':
                    response = await sortTrxbyExitDateService(this.state.sort, page, pageSize);
                    break;
                case 'captainName':
                    response = await sortTrxbyCaptainNameService(this.state.sort, page, pageSize);
                    break;
                case 'shipStatusName':
                    response = await sortTrxbyShipStatusNameService(this.state.sort, page, pageSize);
                    break;
                case 'transactionStatusName':
                    response = await sortTrxbyTrxStatusNameService(this.state.sort, page, pageSize);
                    break;
                default:
                    response = await getListTransactionPaginationService(page, pageSize);
                    break;
            }
            const data = await response.json();
            console.log(data);
            this.setState({listTransaction: data.content});
            return data
        }
    };


    onClickSort = async (orderBy, sort) => {
        await this.setState({orderBy: orderBy, sort: sort});
        console.log(this.state.sort);
        this.doGetListTransactionPaging();
        this.getTransactionData()
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.getTransactionData()
    };
    getTransactionData = async () => {
        const data = await this.doGetListTransactionPaging(0, 5);
        const pages = totalPages(data.totalPages);
        this.setState({totalPages: pages, currentPage: 1})
    };

    onInputSearchType = async (e) => {
        this.setState({searchType: e.target.value})
    };

    onInputSearchFieldOne = async (e) => {
        this.setState({searchFieldOne: e.target.value});
        console.log(this.state.searchFieldOne);
    };
    onInputSearchFieldTwo = async (e) => {
        this.setState({searchFieldTwo: e.target.value});
        console.log(this.state.searchFieldTwo);
    };

    changePage = async (page) => {
        await this.doGetListTransactionPaging(page, 5);
        let currentPage = page + 1;
        this.setCurrentPage(currentPage)
    };

    setCurrentPage = async (currentPage) => {
        this.setState({currentPage: currentPage})
    };

    previous = async () => {
        previousPaging(this.state.currentPage, this.doGetListTransactionPaging, this.setCurrentPage)
    };

    next = async () => {
        nextPaging(this.state.currentPage, this.state.totalPages, this.doGetListTransactionPaging, this.setCurrentPage)
    };


    doTransactionDone = async (transaction) => {
        // this.props.addTransactionAction(transaction);
        // this.props.selectCategoryAction(ship.shipCode);
        await getTransactionDoneService(transaction);
        // this.props.history.push({pathname: '/protected/main/transaction'})
        this.getTransactionData()

        // this.props.history.push({pathname: '/protected/main/TransactionUpdate', state: {forAct: 'Update'}})
    };

    doAddTranscaction = () => {
        // this.props.selectCategoryAction('')
        this.props.history.push({pathname: '/protected/main/TransactionUpdate', state: {forAct: 'Create'}})
    };

    doRenderListField = () => {
        return this.state.trxField.map((field) => {
            return (
                <option value={field}>{field}</option>
            )
        })
    };

    onReportDownload = async () => {
        const response = await getReportService();
        const blob = await response.blob();
        // const link = document.createElement('report');
        let fileURL = window.URL.createObjectURL(new Blob([blob], {type: "application/pdf"}));
        window.open(fileURL);
        // link.href = window.URL.createObjectURL(new Blob([blob]));
        // link.setAttribute('download', 'report')
        // document.body.appendChild(link)
        // link.click();
        // link.remove();
    };
    doRenderListTransaction = () => {
        if (this.state.listTransaction) {
            return this.state.listTransaction.map((transaction) => {
                let status;
                if (transaction.shipStatus.shipStatusName === 'Loading') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                   role="progressbar"
                                   style={{width: '95%'}}>{transaction.shipStatus.shipStatusName}</span>

                } else if (transaction.shipStatus.shipStatusName === 'Unloading') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                   role="progressbar"
                                   style={{width: '95%'}}>{transaction.shipStatus.shipStatusName}</span>
                } else if (transaction.shipStatus.shipStatusName === 'Sailing') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-success "
                                   role="progressbar"
                                   style={{width: '95%'}}>{transaction.shipStatus.shipStatusName}</span>
                } else if (transaction.shipStatus.shipStatusName === 'Berthing') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-info "
                                   role="progressbar"
                                   style={{width: '95%'}}>{transaction.shipStatus.shipStatusName}</span>
                } else {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated"
                                   role="progressbar"
                                   style={{width: '85%'}}>{transaction.shipStatus.shipStatusName}</span>
                }
                let process;
                if (transaction.transactionDetailStatus.transactionStatusName === 'On Process') {
                    process =
                        <button type="button" className='btn btn-link' disabled={this.state.status} onClick={() => {
                            this.doTransactionDone(transaction.id)
                        }}><i className="far fa-check-circle"></i>
                            Done </button>
                }
                let exit;
                if (transaction.transactionDetailStatus.transactionStatusName === 'On Process') {
                    exit = <span className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                 style={{width: '100%'}}>Still On Process</span>
                } else {
                    exit = transaction.exitDate
                }
                return (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.transactionHeader.transactionHeaderId}</td>
                        <td>{transaction.transactionHeader.ship.shipName}</td>
                        <td>{transaction.entryDate}</td>
                        <td>{exit}</td>
                        <td>{transaction.dock.harbor.harborName}</td>
                        <td>{transaction.dock.dockName}</td>
                        <td>{transaction.captainName}</td>
                        <td>{status}</td>
                        <td>{transaction.loadingUnloadingWeight}</td>
                        <td>{transaction.transactionDetailStatus.transactionStatusName}</td>
                        <td>{process}</td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan='2'>No Found</td>
                </tr>
            )
        }
    };

    doRenderInputField = () => {
        if (this.state.searchType === 'id' || this.state.searchType === 'weight') {
            return (
                <div>
                    <input type="number" className='form-control  mb-2 mr-sm-2' required
                           onChange={this.onInputSearchFieldOne}/>
                    <input type="number" className='form-control  mb-2 mr-sm-2' required
                           onChange={this.onInputSearchFieldTwo}/>
                </div>
            )
        } else if (this.state.searchType === 'exitDate' || this.state.searchType === 'entryDate') {
            return (
                <div>
                    <input type="date" className='form-control  mb-2 mr-sm-2' required
                           onChange={this.onInputSearchFieldOne}/>
                    <input type="date" className='form-control  mb-2 mr-sm-2' required
                           onChange={this.onInputSearchFieldTwo}/>
                </div>
            )
        } else {
            return (
                <input type="text" className='form-control  mb-2 mr-sm-2' required
                       onChange={this.onInputSearchFieldOne}/>
            )
        }
    };

    render() {
        return (
            <MainContent {...this.props}>
                {/*<div className="container">*/}
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1 ml-1'><h5><i class="fas fa-dolly-flatbed"></i> Transaction
                                </h5>
                                </div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddTranscaction}><i
                                className="fas fa-plus"></i> New Transaction
                            </button>
                        </div>
                        {/*<div className="input-group mb-2">*/}
                        {/*    <form onSubmit={this.getTransactionData}>*/}
                        {/*    <div className="input-group-prepend">*/}
                        {/*        <select className="custom-select form-control mb-2 mr-sm-2'"*/}
                        {/*                onChange={this.onInputSearchType}>*/}
                        {/*            <option>Search By...</option>*/}
                        {/*            {this.doRenderListField()}*/}
                        {/*        </select>*/}
                        {/*        {this.doRenderInputField()}*/}
                        {/*        <button className="btn btn-primary awesome-button-lg" >*/}
                        {/*            Search*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                        <form className="form-inline" onSubmit={this.onSubmit}>
                            <select className="custom-select form-control mb-2 mr-sm-2'"
                                    onChange={this.onInputSearchType}>
                                <option>Search By...</option>
                                {this.doRenderListField()}
                            </select>
                            {this.doRenderInputField()}
                            <button type="submit" className="btn btn-primary mb-2">Search</button>
                        </form>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.onReportDownload}><i
                                className="fas fa-download"></i> Download Report
                            </button>
                        </div>
                        <div className="card-text">
                            <div className="table-responsive">
                                <table className='table table-sm' style={{width: '80rem'}}>
                                    <thead className="thead-dark">
                                    <tr>
                                        <th>ID
                                            <i onClick={() => {
                                                this.onClickSort("id", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("id", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>

                                        <th>Trx Header
                                            <i onClick={() => {
                                                this.onClickSort("transactionHeaderId", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("transactionHeaderId", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Ship Name
                                            <i onClick={() => {
                                                this.onClickSort("shipName", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("shipName", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Entry Date
                                            <i onClick={() => {
                                                this.onClickSort("entryDate", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("entryDate", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Exit Date
                                            <i onClick={() => {
                                                this.onClickSort("exitDate", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("exitDate", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Harbor Name
                                            <i onClick={() => {
                                                this.onClickSort("harborName", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("harborName", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Dock Name
                                            <i onClick={() => {
                                                this.onClickSort("dockName", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("dockName", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Captain Name
                                            <i onClick={() => {
                                                this.onClickSort("captainName", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("captainName", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Ship Status
                                            <i onClick={() => {
                                                this.onClickSort("shipStatusName", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("shipStatusName", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Weight
                                            <i onClick={() => {
                                                this.onClickSort("weight", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("weight", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th>Status
                                            <i onClick={() => {
                                                this.onClickSort("transactionStatusName", "desc")
                                            }} className='fas fa-sort-up'></i>
                                            <i onClick={() => {
                                                this.onClickSort("transactionStatusName", "asc")
                                            }} className='fas fa-sort-down'></i>
                                        </th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.doRenderListTransaction()}
                                    </tbody>
                                </table>
                            </div>
                            {pagination(paging(this.state.totalPages, this.state.currentPage, this.state.disable, this.changePage), this.previous, this.next)}
                        </div>
                    </div>
                </div>
                {/*</div>*/}
            </MainContent>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {listTransaction: state.listTransaction};
// };

// const mapDispatchToProps = {
//     getListTransactionAction: getListTransactionAction,
//     addTransactionAction: addTransactionAction
// };
export default (Transaction);