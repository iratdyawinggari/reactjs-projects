import {mount, shallow} from "enzyme";
import React from "react";
import {App} from "../../App";
import {Login} from "../../components/login/Login";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {MainContent} from "../../components/mainContent/MainContent";
import "../../setupTest"


describe('App Component', () => {
    it('should render', () => {
        const wrapper = shallow(<App userActive={{}}/>);
        expect(wrapper.find('BrowserRouter').length).toEqual(1);
    });

    it('default path to login', () => {
        const wrapper = shallow(
            <BrowserRouter initialEntries={['/']}>
                <Login/>
            </BrowserRouter>
        );
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('should show main content when /main', () => {
        const isEmptyObj = false;
        const wrapper = shallow(
            <BrowserRouter initialEntries={['/main']}>
                {isEmptyObj ? <Redirect to='/'/> : <MainContent/>}
            </BrowserRouter>
        );
        expect(wrapper.find(MainContent)).toHaveLength(1);
    });
    it('should not show main content when empty object', () => {
        const isEmptyObj = true;
        const wrapper = mount(
            <BrowserRouter initialEntries={['/main']}>
                <Route path='/' exact component={Login}/>
                <Route path='/main' render={(props) => {
                    return isEmptyObj ? <Redirect to='/'/> : <MainContent {...props}/>
                }}/>
            </BrowserRouter>
        );
        expect(wrapper.find(Login)).toHaveLength(1);
    });

    // it('should show mapStateToProps value', () => {
    //     const initialState = {
    //         userActive: 'rey'
    //     };
    //
    //     expect(mapStateToProps(initialState).userActive).toEqual('rey');
    // });
});
