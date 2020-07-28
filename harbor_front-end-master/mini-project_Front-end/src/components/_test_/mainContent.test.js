import {shallow} from "enzyme/build/index";
import {MainContent, mapStateToProps} from "../mainContent/MainContent";
import React from "react";
import "../../setupTest"

describe('Main Content Component', () => {
    let wrapper;

    // it('should render with text', () => {
    //     wrapper = shallow(<MainContent userActive={'rey'}/>);
    //     expect(wrapper.find('div').text()).toEqual('rey');
    // });
    // it('should render empty', () => {
    //     wrapper = shallow(<MainContent userActive={{}}/>);
    //     expect(wrapper.find('div').text()).toEqual('');
    // });
    it('should show mapStateToProps value', () => {
        const initialState = {
            userActive: 'rey'
        };
        expect(mapStateToProps(initialState).userActive).toEqual('rey');
    });
});
