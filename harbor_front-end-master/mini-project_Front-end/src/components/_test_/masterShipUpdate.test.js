import {shallow} from "enzyme";
import {MasterShipUpdate} from "../../components/ship/MasterShipUpdate";
import React from "react";
import "../../setupTest"


let wrapper;
let ship = {
    ship: {
        forAct: 'create',
        shipCode: 1,
        shipName: 'rey',
        captainName: 'cpt.amerika',
        shipStatus: {shipStatusId: 1}
    }
};
let test = {location: {state: ship}};
// let state = {dockCode :1 , dockName : 'rey', harbor :{harborCode: 1}, dockStatus :{dockStatusId: 1 }}
// jest.mock('../../api/user');
// const mockStore = configureStore();
// let store = mockStore();
beforeEach(() => {
    wrapper = shallow(<MasterShipUpdate history={test}/>);
});

afterEach(() => {
    wrapper.unmount();
});
describe('Master Ship Update Component', () => {
    it('should render', () => {
        expect(wrapper.find('label').length).toEqual(3);

        const input = wrapper.find('input');
        expect(input).toHaveLength(3);

        const form = wrapper.find('form');
        expect(form).toHaveLength(1);

        const label = wrapper.find('label');
        expect(label).toHaveLength(3);

        const buttonContainer = wrapper.find('button');
        expect(buttonContainer).toHaveLength(3);
    });
    //
    it("should have state set properly", () => {
        // expect(wrapper.state().dockName).toEqual('');
        expect(wrapper.state().shipCode).toEqual(1);
        expect(wrapper.state().shipName).toEqual('rey');
        expect(wrapper.state().statusId).toEqual(1);
        expect(wrapper.state().captainName).toEqual('cpt.amerika');
        // expect(wrapper.state().forAct).toEqual('create');
        // expect(wrapper.state().buttonDisable).toEqual(true);
    });
    it('Input shipCode event & set state', () => {
        wrapper.find('input').at(0).simulate('change', {target: {value: 'S-0001'}});
        expect(wrapper.instance().state.shipCode).toEqual('S-0001');
    });
    it('Input shipName event & set state', () => {
        wrapper.find('input').at(1).simulate('change', {target: {value: 'titanic'}});
        expect(wrapper.instance().state.shipName).toEqual('titanic');
    });
});
