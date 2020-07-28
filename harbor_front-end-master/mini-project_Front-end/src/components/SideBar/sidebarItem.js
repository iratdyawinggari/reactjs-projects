import React from 'react';
import './sidebaritem.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setMenuActiveAction, setMenuHeaderActiveAction, unsetMenuHeaderActiveAction} from "../../actions/menu";

class SidebarItem extends React.Component {
    doShowModule = (event, menu) => {
        event.preventDefault();
        this.props.setMenuActiveAction(menu.name);
        this.props.history.push({
            pathname: menu.path
        });
    };

    doSetVisibilty = () => {
        if (this.props.menuHeaderActive.includes(this.props.header)) {
            this.props.unsetMenuHeaderActiveAction(this.props.header);
        } else {
            this.props.setMenuHeaderActiveAction(this.props.header);
        }

    };

    doRenderChildren = () => {
        return this.props.children.map((menu) => {
            return (
                <li key={menu.name} className={`nav-item ${this.props.menuActive === menu.name ? 'active-item' : ''}`}>
                    <div className='nav-link item-cursor' onClick={(event) => {
                        this.doShowModule(event, menu)
                    }}><i className={`fas ${menu.icon}`}></i> {menu.name}</div>
                </li>
            )
        })
    };

    render() {
        return (
            <div>
                <div className='bg-secondary pl-2 text-white item-cursor'
                     onClick={this.doSetVisibilty}> {this.props.header}</div>
                <ul className={`nav d-flex flex-column ${this.props.menuHeaderActive.includes(this.props.header) ? '' : 'hide-children'}`}>
                    {this.doRenderChildren()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {menuActive: state.menuActive, menuHeaderActive: state.menuHeaderActive};
};

const mapDispatchToProps = {
    setMenuActiveAction: setMenuActiveAction,
    setMenuHeaderActiveAction: setMenuHeaderActiveAction,
    unsetMenuHeaderActiveAction: unsetMenuHeaderActiveAction
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarItem));
