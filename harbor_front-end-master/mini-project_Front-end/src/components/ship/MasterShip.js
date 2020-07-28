import React from 'react';
import MainContent from "../mainContent/MainContent";
import {
    getListShipsPaginationService,
    searchCaptainNameCodeService,
    searchShipCodeService,
    searchShipsService,
    searchStatusNameService
} from "../../api/ships";
import {nextPaging, pagination, paging, previousPaging, totalPages} from "../pagination/pagination";

export class MasterShip extends React.Component {
    state = {
        listShip: [],
        totalPages: [],
        currentPage: null,
        disable: true,
        shipField: [
            "shipCode",
            "shipName",
            "captainName",
            "status"
        ],
        searchField: '',
        searchType: ''

    };


    componentDidMount() {
        this.getShipData()
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };

    doGetListShipPaging = async (page, pageSize) => {
        // e.preventDefault();
        let response;
        switch (this.state.searchType) {
            case 'shipName':
                response = await searchShipsService(this.state.searchField, page, pageSize);
                console.log(this.state.searchField);
                break;
            case 'shipCode':
                response = await searchShipCodeService(this.state.searchField, page, pageSize);
                break;
            case 'captainName':
                response = await searchCaptainNameCodeService(this.state.searchField, page, pageSize);
                break;
            case 'status':
                response = await searchStatusNameService(this.state.searchField, page, pageSize);
                break;
            default:
                response = await getListShipsPaginationService(page, pageSize);
                break;
        }
        const data = await response.json();
        console.log(data);
        this.setState({listShip: data.content});
        return data
    };

    getShipData = async (e) => {
        // e.preventDefault();
        const data = await this.doGetListShipPaging(0, 5);
        const pages = totalPages(data.totalPages);
        this.setState({totalPages: pages, currentPage: 1})
    };

    changePage = async (page) => {
        await this.doGetListShipPaging(page, 5);
        let currentPage = page + 1;
        this.setCurrentPage(currentPage)
    };

    onInputSearchType = async (e) => {
        this.setState({searchType: e.target.value})
    };

    onInputSearchField = async (e) => {
        this.setState({searchField: e.target.value})
    };

    setCurrentPage = async (currentPage) => {
        this.setState({currentPage: currentPage})
    };

    previous = async () => {
        previousPaging(this.state.currentPage, this.doGetListShipPaging, this.setCurrentPage)
    };

    next = async () => {
        nextPaging(this.state.currentPage, this.state.totalPages, this.doGetListShipPaging, this.setCurrentPage)
    };

    doUpdateShip = (ship) => {
        // this.props.updateShipAction(ship);
        // this.props.selectCategoryAction(ship.shipCode);
        this.props.history.push({pathname: '/protected/main/masterShipUpdate', state: {forAct: 'Update', ship: ship}})
    };

    doDeleteShip = (ship) => {
        // this.props.updateShipAction(ship);
        // this.props.selectCategoryAction(ship.shipCode);
        this.props.history.push({pathname: '/protected/main/masterShipUpdate', state: {forAct: 'Delete', ship: ship}})
    };

    doAddShip = () => {
        // this.props.selectCategoryAction('')
        this.props.history.push({pathname: '/protected/main/masterShipUpdate', state: {forAct: 'Create'}})
    };

    doRenderListField = () => {
        return this.state.shipField.map((field) => {
            return (
                <option value={field}>{field}</option>
            )
        })
    };

    doRenderListShip = () => {
        if (this.state.listShip) {
            return this.state.listShip.map((ship) => {
                let status;
                if (ship.shipStatus.shipStatusName === 'Suspend') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                   role="progressbar"
                                   style={{width: '50%'}}>{ship.shipStatus.shipStatusName}</span>

                } else if (ship.shipStatus.shipStatusName === 'Unloading') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                   role="progressbar"
                                   style={{width: '50%'}}>{ship.shipStatus.shipStatusName}</span>
                } else if (ship.shipStatus.shipStatusName === 'Sailing') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-success "
                                   role="progressbar"
                                   style={{width: '50%'}}>{ship.shipStatus.shipStatusName}</span>
                } else if (ship.shipStatus.shipStatusName === 'Berthing') {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated bg-info "
                                   role="progressbar"
                                   style={{width: '50%'}}>{ship.shipStatus.shipStatusName}</span>
                } else {
                    status = <span className="progress-bar progress-bar-striped progress-bar-animated"
                                   role="progressbar"
                                   style={{width: '50%'}}>{ship.shipStatus.shipStatusName}</span>
                }
                // let suspend;
                // if (ship.shipStatus.shipStatusName === 'Suspend'){
                //     suspend =<button type="button" className='btn btn-link' onClick={() => {
                //         this.doUpdateShip(ship)
                //     }}><i className="fas fa-edit"></i>
                //         Edit
                //     </button>
                //     suspend= <button type="button" className='btn btn-link' onClick={() => {
                //         this.doDeleteShip(ship)
                //     }}><i className="fas fa-trash"></i>
                //     Delete
                //     </button>
                // }
                return (
                    <tr key={ship.shipCode}>
                        <td>{ship.shipCode}</td>
                        <td>{ship.shipName}</td>
                        <td>{ship.captainName}</td>
                        <td>{status}</td>
                        <td>
                            <button type="button" className='btn btn-link'
                                    disabled={ship.shipStatus.shipStatusName === 'Suspend'} onClick={() => {
                                this.doUpdateShip(ship)
                            }}><i className="fas fa-edit"></i>
                                Edit
                            </button>
                            <button type="button" className='btn btn-link'
                                    disabled={ship.shipStatus.shipStatusName === 'Suspend'} onClick={() => {
                                this.doDeleteShip(ship)
                            }}><i className="fas fa-trash"></i>
                                Delete
                            </button>
                        </td>
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

    render() {
        return (
            <MainContent {...this.props}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><h5><i class="fas fa-dolly-flatbed"></i> Master Ship</h5>
                                </div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddShip}><i
                                className="fas fa-plus"></i> New Ship
                            </button>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                {/*<form onSubmit={this.getShipData}>*/}
                                <select className="custom-select"
                                        onChange={this.onInputSearchType}>
                                    <option>Search By...</option>
                                    {this.doRenderListField()}
                                </select>
                                <input type="text" onChange={this.onInputSearchField}/>
                                <button className="btn btn-primary awesome-button-lg" onClick={this.getShipData}>
                                    Search
                                </button>
                                {/*</form>*/}
                            </div>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Ship ID</td>
                                    <td>Ship Name</td>
                                    <td>Captain Name</td>
                                    <td>Ship Status</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListShip()}
                                </tbody>
                            </table>
                            {pagination(paging(this.state.totalPages, this.state.currentPage, this.state.disable, this.changePage), this.previous, this.next)}
                        </div>

                    </div>
                </div>
            </MainContent>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {listShip: state.listShip};
// };
//
// const mapDispatchToProps = {
//     updateShipAction: updateShipAction
// };
export default (MasterShip);
