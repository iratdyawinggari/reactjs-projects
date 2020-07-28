import {shallow} from "enzyme";
import {MasterDockUpdate} from "../../components/docks/MasterDocksUpdate";
import React from "react";
import "../../setupTest"


let wrapper;
let dock = {
    dock: {
        forAct: 'create',
        dockCode: 1,
        dockName: 'rey',
        harbor: {harborCode: 1},
        dockStatus: {dockStatusId: 1}
    }
};
let test = {location: {state: dock}};
// let state = {dockCode :1 , dockName : 'rey', harbor :{harborCode: 1}, dockStatus :{dockStatusId: 1 }}
// jest.mock('../../api/user');
// const mockStore = configureStore();
// let store = mockStore();
beforeEach(() => {
    wrapper = shallow(<MasterDockUpdate history={test}/>);
});

afterEach(() => {
    wrapper.unmount();
});
describe('Master Docks Update Component', () => {
    it('should render', () => {
        expect(wrapper.find('option').length).toEqual(2);

        const label = wrapper.find('label');
        expect(label).toHaveLength(4);

        const buttonContainer = wrapper.find('button');
        expect(buttonContainer).toHaveLength(3);
    });
    //
    it("should have state set properly", () => {
        // expect(wrapper.state().dockName).toEqual('');
        expect(wrapper.state().dockCode).toEqual(1);
        expect(wrapper.state().dockName).toEqual('rey');
        expect(wrapper.state().harborId).toEqual(1);
        expect(wrapper.state().statusId).toEqual(1);
        // expect(wrapper.state().forAct).toEqual('create');
        // expect(wrapper.state().buttonDisable).toEqual(true);
    });
    it('Input dockCode event & set state', () => {
        wrapper.find('input').at(0).simulate('change', {target: {value: 'POK1'}});
        expect(wrapper.instance().state.dockCode).toEqual('POK1');
    });
    it('Input dockName event & set state', () => {
        wrapper.find('input').at(1).simulate('change', {target: {value: 'Priok1'}});
        expect(wrapper.instance().state.dockName).toEqual('Priok1');
    });
    it('Input harbor event & set state', () => {
        wrapper.find('select').at(0).simulate('change', {target: {value: 1}});
        expect(wrapper.instance().state.harborId).toEqual(1);
    });
    it('Input status event & set state', () => {
        wrapper.find('select').at(1).simulate('change', {target: {value: 1}});
        expect(wrapper.instance().state.statusId).toEqual(1);
    });
});
