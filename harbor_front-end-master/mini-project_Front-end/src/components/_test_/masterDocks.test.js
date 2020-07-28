import {shallow} from "enzyme";
import {MasterDocks} from "../../components/docks/MasterDocks";
import React from "react";
import "../../setupTest"


let wrapper;

beforeEach(() => {
    wrapper = shallow(<MasterDocks/>);
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
        expect(buttonContainer).toHaveLength(4);
    });

    it("should have state set properly", () => {
        expect(wrapper.state().totalPages).toEqual([]);
        expect(wrapper.state().currentPage).toEqual(null);
        expect(wrapper.state().disable).toEqual(true);
        expect(wrapper.state().listDock).toEqual([]);
        // expect(wrapper.state().buttonDisable).toEqual(true);
    });
});
