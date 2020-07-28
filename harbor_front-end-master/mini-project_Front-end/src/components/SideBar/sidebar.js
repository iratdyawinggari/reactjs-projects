import React from 'react';
import SidebarItem from "./sidebarItem";
import {connect} from "react-redux";

class Sidebar extends React.Component {


    doRenderMenu = () => {
        return this.props.menu.map((menu) => {
            return (
                <SidebarItem key={menu.header} header={menu.header} children={menu.children}/>
            )
        })
    };

    render() {
        return this.doRenderMenu();
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.listMenu
    };
};

export default connect(mapStateToProps)(Sidebar);
