import React from 'react';
import MainContent from "../mainContent/MainContent";
import {getListDockPaginationService} from "../../api/docks";
import {nextPaging, pagination, paging, previousPaging, totalPages} from "../pagination/pagination";

export class MasterDocks extends React.Component {
    state = {totalPages: [], currentPage: null, disable: true, listDock: []};

    componentDidMount() {
        this.getDockData();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };

    doGetListDockPaging = async (page, pageSize) => {
        const response = await getListDockPaginationService(page, pageSize);
        const data = await response.json();
        console.log(data);
        this.setState({listDock: data.content});
        return data
    };

    getDockData = async () => {
        const data = await this.doGetListDockPaging(0, 5);
        const pages = totalPages(data.totalPages);
        this.setState({totalPages: pages, currentPage: 1})
    };

    changePage = async (page) => {
        await this.doGetListDockPaging(page, 5);
        let currentPage = page + 1;
        this.setCurrentPage(currentPage)
    };

    setCurrentPage = async (currentPage) => {
        this.setState({currentPage: currentPage})
    };

    previous = async () => {
        previousPaging(this.state.currentPage, this.doGetListDockPaging, this.setCurrentPage)
    };

    next = async () => {
        nextPaging(this.state.currentPage, this.state.totalPages, this.doGetListDockPaging, this.setCurrentPage)
    };

    doUpdateDocks = (dock) => {
        // this.props.updateDockAction(dock);
        // this.props.selectCategoryAction(dock.dockCode);
        this.props.history.push({pathname: '/protected/main/masterDocksUpdate', state: {forAct: 'Update', dock: dock}})
    };

    doDeleteDocks = (dock) => {
        // this.props.updateDockAction(dock);
        // this.props.selectCategoryAction(dock.dockCode);
        this.props.history.push({pathname: '/protected/main/masterDocksUpdate', state: {forAct: 'Delete', dock: dock}})
    };

    doAddDocks = () => {
        // this.props.selectCategoryAction('')
        this.props.history.push({pathname: '/protected/main/masterDocksUpdate', state: {forAct: 'Create'}})
    };

    doRenderListDocks = () => {
        if (this.state.listDock) {
            console.log(this.state.listDock);
            return this.state.listDock.map((dock) => {
                let status;
                if (dock.dockStatus.dockStatusName === 'Available') {
                    status =
                        <span className='btn btn-success' style={{width: '65%'}}>{dock.dockStatus.dockStatusName}</span>
                } else if (dock.dockStatus.dockStatusName === 'Unavailable') {
                    status =
                        <span className='btn btn-warning' style={{width: '65%'}}>{dock.dockStatus.dockStatusName}</span>
                } else if (dock.dockStatus.dockStatusName === 'Suspend') {
                    status =
                        <span className='btn btn-danger' style={{width: '65%'}}>{dock.dockStatus.dockStatusName}</span>
                } else {
                    status =
                        <span className='btn btn-info' style={{width: '65%'}}>{dock.dockStatus.dockStatusName}</span>
                }
                return (
                    <tr key={dock.dockCode}>
                        <td>{dock.dockCode}</td>
                        <td>{dock.dockName}</td>
                        <td>{dock.harbor.harborName}</td>
                        <td>{status}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateDocks(dock)
                            }}><i className="fas fa-edit"></i>
                                Edit
                            </button>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doDeleteDocks(dock)
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
                                <div className='flex-grow-1'><h5><i class="fas fa-dolly-flatbed"></i> Master Dock</h5>
                                </div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-subtitle mb-3">
                            <button className="btn btn-link" onClick={this.doAddDocks}><i
                                className="fas fa-plus"></i> New Dock
                            </button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <th>Dock ID</th>
                                    <th>Dock Name</th>
                                    <th>Harbour Name</th>
                                    <th>Dock Status</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListDocks()}
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
//     return {listDocks: state.listDocks};
// };
//
// const mapDispatchToProps = {
//     setListDocksAction: setListDocksAction,
//     updateDockAction: updateDockAction
//     // selectCategoryAction:selectCategoryAction
// };
export default (MasterDocks);