import {shallow} from "enzyme";
import {MasterShip} from "../../components/ship/MasterShip";
import React from "react";
import "../../setupTest"


let wrapper;
// jest.mock('../../api/user');
// const mockStore = configureStore();
// let store = mockStore();
beforeEach(() => {
    wrapper = shallow(<MasterShip/>);
});

afterEach(() => {
    wrapper.unmount();
});
describe('Master Docks Component', () => {
    it('should render', () => {
        expect(wrapper.find('table').length).toEqual(1);

        const tableRow = wrapper.find('tr');
        expect(tableRow).toHaveLength(1);

        const span = wrapper.find('span');
        expect(span).toHaveLength(2);

        const buttonContainer = wrapper.find('button');
        expect(buttonContainer).toHaveLength(5);
    });
    //
    it("should have state set properly", () => {
        expect(wrapper.state().totalPages).toEqual([]);
        expect(wrapper.state().currentPage).toEqual(null);
        expect(wrapper.state().disable).toEqual(true);
        expect(wrapper.state().searchType).toEqual('');
        expect(wrapper.state().searchField).toEqual('');
        expect(wrapper.state().shipField).toEqual(["shipCode",
            "shipName",
            "captainName",
            "status"]);
        // expect(wrapper.state().buttonDisable).toEqual(true);
    });
    it('Input searchType event & set state', () => {
        wrapper.find('select').at(0).simulate('change', {target: {value: 'tes'}});
        expect(wrapper.instance().state.searchType).toEqual('tes');
    });
    it('Input searchField event & set state', () => {
        wrapper.find('input').at(0).simulate('change', {target: {value: 'tes'}});
        expect(wrapper.instance().state.searchField).toEqual('tes');
    });
    it('Input totalPage event & set state', () => {
        wrapper.find('button').at(2).simulate('click', {target: {value: []}});
        expect(wrapper.instance().state.totalPages).toEqual([]);
    });
    it('Input currentPage event & set state', () => {
        wrapper.find('button').at(2).simulate('click', {target: {value: null}});
        expect(wrapper.instance().state.currentPage).toEqual(null);
    });
});
