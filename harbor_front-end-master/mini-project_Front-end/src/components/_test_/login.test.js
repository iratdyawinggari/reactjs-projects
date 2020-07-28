import {shallow} from "enzyme";
import {Login} from "../../components/login/Login";
import React from "react";
import "../../setupTest"


let wrapper;
// jest.mock('../../api/user');
// const mockStore = configureStore();
// let store = mockStore();
beforeEach(() => {
    wrapper = shallow(<Login/>);
});

afterEach(() => {
    wrapper.unmount();
});
describe('Login Component', () => {
    it('should render', () => {
        expect(wrapper.find('label').length).toEqual(2);

        const inputContainer = wrapper.find('input');
        expect(inputContainer).toHaveLength(2);

        const buttonContainer = wrapper.find('button');
        expect(buttonContainer).toHaveLength(1);
    });
    it('should render input for user name & password also button sign in', () => {
        expect(wrapper.find('[name="emailInput"]')).toHaveLength(1);
        // expect(wrapper.find({name: "userName"})).toHaveLength(1);
        expect(wrapper.find('[name="passwordInput"]')).toHaveLength(1);

        const buttonContainer = wrapper.find('button');
        expect(buttonContainer.text()).toEqual("Login");
        // expect(buttonContainer.prop('disabled')).toEqual(true);
    });
    //
    it("should have state set properly", () => {
        expect(wrapper.state().email).toEqual('');
        expect(wrapper.state().password).toEqual('');
        expect(wrapper.state().invalidPassword).toEqual('');
        expect(wrapper.state().invalidEmail).toEqual('');
        expect(wrapper.state().hideEmail).toEqual('');
        expect(wrapper.state().alert).toEqual('login hideAlert');
        expect(wrapper.state().hidePassword).toEqual('hideInput');
        expect(wrapper.state().notificationMessage).toEqual('');
        expect(wrapper.state().loading).toEqual(false);
        // expect(wrapper.state().buttonDisable).toEqual(true);
    });
    //
    it('Input user name event & set state', () => {
        wrapper.find('input').at(0).simulate('change', {target: {value: 'rey'}});
        expect(wrapper.instance().state.email).toEqual('rey');
    });
    //
    it('Input user password event & set state', () => {
        wrapper.find('input').at(1).simulate('change', {target: {value: '123'}});
        expect(wrapper.instance().state.password).toEqual('123');
    });

    // it('Input email on keypress',  () => {
    //     wrapper.find('input').simulate('keypress', {key: 'Enter'}).dive()
    // });
    // it('Button signin enable when userName & password state is filled', () => {
    //     wrapper.instance().setState({buttonDisable: false});
    //     const buttonContainer = wrapper.find('button');
    //     expect(buttonContainer.props().disabled).toEqual(false);
    // });
    //
    it('Sign in email click event', () => {
        wrapper.instance().setState({email: 'rey@gmail'});
        const buttonContainer = wrapper.find('button').at(0);
        buttonContainer.simulate('click');
    })
    it('Sign in password click event', () => {
        wrapper.instance().setState({password: '123'});
        const buttonContainer = wrapper.find('button').at(0);
        buttonContainer.simulate('click');
    })
});
