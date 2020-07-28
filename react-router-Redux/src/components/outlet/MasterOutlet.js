import React from 'react';
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";
import {getListOutletService} from "../../api/outlet";
import {setListOutletAction, updateOutletAction} from "../../actions/outlet";

class MasterOutlet extends React.Component {
    componentDidMount() {
        this.doGetListOutlet();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/protected/main'
        })
    };


    doGetListOutlet = async () => {
        const response = await getListOutletService();
        const data = await response.json();
        this.props.setListOutletAction(data);
    };

    doUpdateOutlet = (outlet) => {
        this.props.updateOutletAction(outlet);
        this.props.history.push({pathname: '/protected/main/masterOutletUpdate', state: {forAct: 'Update'}})
    };

    doDeleteOutlet = (outlet) => {
        this.props.updateOutletAction(outlet);
        this.props.history.push({pathname: '/protected/main/masterOutletUpdate', state: {forAct: 'Delete'}})
    };
    doAddOutlet = () => {
        this.props.history.push({pathname: '/protected/main/masterOutletUpdate', state: {forAct: 'Create'}})
    };

    doRenderListOutlet = () => {
        if (this.props.listOutlet) {
            return this.props.listOutlet.map((outlet) => {
                return (
                    <tr key={outlet.outletId}>
                        <td>{outlet.outletId}</td>
                        <td>{outlet.outletName}</td>
                        <td>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doUpdateOutlet(outlet)
                            }}><i className="fas fa-edit"></i>
                            </button>
                            <button type="button" className='btn btn-link' onClick={() => {
                                this.doDeleteOutlet(outlet)
                            }}><i className="fas fa-trash"></i>
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
                                <div className='flex-grow-1'><i class="fas fa-clipboard-list"></i> Master Outlet</div>
                                <div>
                                    <button className="btn btn-link" onClick={this.doTutup}><i
                                        className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </h5>
                        <div className="card-subtitle mb-2">
                            <button className="btn btn-link" onClick={this.doAddOutlet}><i className="fas fa-plus"></i> New Outlet</button>
                        </div>
                        <div className="card-text">
                            <table className='table table-sm' style={{width: '100%'}}>
                                <thead className="thead-dark">
                                <tr>
                                    <td>Outlet ID</td>
                                    <td>Outlet Name</td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.doRenderListOutlet()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MainContent>
        )
    }
}

const mapStateToProps = (state) => {
    return {listOutlet: state.listOutlet};
};

const mapDispatchToProps = {
    setListOutletAction: setListOutletAction,
    updateOutletAction: updateOutletAction
};
export default connect(mapStateToProps, mapDispatchToProps)(MasterOutlet);