import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListHarborPaginationService} from "../../api/harbor";
import {nextPaging, pagination, paging, previousPaging, totalPages} from "../pagination/pagination";

class MasterHarbor extends React.Component {
    state = {totalPages: [], currentPage: null, disable: true, listHarbor: []};

    componentDidMount() {
        this.getHarborData();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main/'
        })
    };


    doGetListHarborPaging = async (page, pageSize) => {
        const response = await getListHarborPaginationService(page, pageSize);
        const data = await response.json();
        console.log(data);
        this.setState({listHarbor: data.content});
        return data
    };

    getHarborData = async () => {
        const data = await this.doGetListHarborPaging(0, 5);
        const pages = totalPages(data.totalPages);
        this.setState({totalPages: pages, currentPage: 1})
    };

    changePage = async (page) => {
        await this.doGetListHarborPaging(page, 5);
        let currentPage = page + 1;
        this.setCurrentPage(currentPage)
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

    doUpdateHarbor = (harbor) => {
        // this.props.updateHarborAction(harbor);
        this.props.history.push({
            pathname: '/protected/main/masterHarborUpdate',
            state: {forAct: 'Update', harbor: harbor}
        })
    };

    doDeleteHarbor = (harbor) => {
        // this.props.updateHarborAction(harbor);
        this.props.history.push({
            pathname: '/protected/main/masterHarborUpdate',
            state: {forAct: 'Delete', harbor: harbor}
        })
    };
    doAddHarbor = () => {
        this.props.history.push({pathname: '/protected/main/masterHarborUpdate', state: {forAct: 'Create'}})
    };

    doRenderListHarbor = () => {
        if (this.state.listHarbor) {
            return this.state.listHarbor.map((harbor) => {
                let status;
                if (harbor.harborStatus.harborStatusName === 'Available') {
                    status = <span className='btn btn-success'
                                   style={{width: '70%'}}>{harbor.harborStatus.harborStatusName}</span>
                } else if (harbor.harborStatus.harborStatusName === 'Unavailable') {
                    status = <span className='btn btn-warning'
                                   style={{width: '70%'}}>{harbor.harborStatus.harborStatusName}</span>
                } else if (harbor.harborStatus.harborStatusName === 'Suspend') {
                    status = <span className='btn btn-danger'
                                   style={{width: '70%'}}>{harbor.harborStatus.harborStatusName}</span>
                } else {
                    status = <span className='btn btn-info'
                                   style={{width: '70%'}}>{harbor.harborStatus.harborStatusName}</span>
                }
                return (
                    <tr key={harbor.harborCode}>
                        <td>{harbor.harborCode}</td>
                        <td>{harbor.harborName}</td>
                        <td>{harbor.harborCapacity}</td>
                        <td>{status}</td>
                        <td>
                            <button type="button" className='btn btn-link'
                                    disabled={harbor.harborStatus.harborStatusName === 'Suspend'} onClick={() => {
                                this.doUpdateHarbor(harbor)
                            }}><i className="fas fa-edit"></i>
                                Edit
                            </button>
                            <button type="button" className='btn btn-link'
                                    disabled={harbor.harborStatus.harborStatusName === 'Suspend'} onClick={() => {
                                this.doDeleteHarbor(harbor)
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
                        <h5 className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><i class="fas fa-clipboard-list"></i> Master Harbor</div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </h5>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddHarbor}><i
                                className="fas fa-plus"></i> New Harbor
                            </button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Harbor ID</td>
                                    <td>Harbor Name</td>
                                    <td>Harbor Capacity</td>
                                    <td>Harbor Status</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListHarbor()}
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
//     return {listHarbor: state.listHarbor};
// };

// const mapDispatchToProps = {
//     setListHarborAction: setListHarborAction,
//     updateHarborAction: updateHarbourAction
// };
export default (MasterHarbor);