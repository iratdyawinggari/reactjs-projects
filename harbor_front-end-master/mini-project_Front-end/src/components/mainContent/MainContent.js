import React from 'react';
import './mainContent.css';
import {connect} from "react-redux";
import {logout} from "../../actions/user/index";
import Sidebar from "../SideBar/sidebar";

export class MainContent extends React.Component {
    doLogout = (event) => {
        event.preventDefault();
        this.props.logout();
        // console.log(this.props)
    };

    render() {
        return (
            <div className="main">
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#"><i className="fas fa-ship"></i>Enigma
                        Harbor</a>
                    <ul className="navbar-nav px-3">
                        <li className="d-flex flex-row nav-item text-nowrap">
                            <label className='nav-link mr-1'>{'Welcome ' + this.props.userActive.fullname}</label>
                            <a className="nav-link" href="#" onClick={this.doLogout}><i
                                className="fas fa-sign-out-alt"></i> Logout</a>
                        </li>
                    </ul>
                </nav>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-2 bg-light sidebar'>
                            <Sidebar/>
                        </div>
                        <div className='col-md-9' style={{marginTop: '5%', marginLeft: '20%'}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {userActive: state.userActive};
};

const mapDispatchToProps = {
    logout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);