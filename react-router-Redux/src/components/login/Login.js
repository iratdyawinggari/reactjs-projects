import React from 'react';
import './login.css';
import {validatePassword, validateUserName} from "../../api/user";
import {authUser, changeUserSession} from "../../actions/user/index";
import {connect} from "react-redux";
import Modal from "../modal/Modal";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            invalidEmail: '',
            invalidPassword: '',
            alert: 'login hideAlert',
            hideEmail: '',
            hidePassword: 'hideInput',
            notificationMessage: '',
            userId: '',
            loading: false
        };
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    };

    componentDidMount() {
        this.emailRef.current.focus();
    }

    doLogin = async (event) => {
        event.preventDefault();

        if (!this.state.password) {
            this.setState({invalidPassword: 'is-invalid'});
        }
        if (this.state.userId && this.state.password) {
            await this.setState({loading: true});
            try {
                const response = await validatePassword(this.state.userId, this.state.password);
                const data = await response.json();

                if (data.userId) {
                    this.props.changeUserSession(true);
                    this.props.authUser(data);
                    this.props.history.push({
                        pathname: '/protected/main'
                    })
                } else {
                    this.setState({alert: '', notificationMessage: 'Invalid Password'})
                }
            } catch (err) {
                this.setState({alert: '', notificationMessage: 'Invalid Password'})
            }
            await this.setState({loading: false});
        }
    };

    onEmailInputChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordInputChange = (event) => {
        this.setState({password: event.target.value});
    };

    onHandleKeyPress = async (event, from) => {
        if (event.key === 'Enter' && from === 'email') {
            if (!this.state.email) {
                this.setState({invalidEmail: 'is-invalid'});
            } else {
                await this.setState({loading: true});
                try {
                    const response = await validateUserName(this.state.email);
                    const data = await response.json();
                    if (data.status === 'ok') {
                        await this.setState({
                            invalidEmail: '',
                            invalidPassword: '',
                            alert: 'login hideAlert',
                            hideEmail: 'login hideInput',
                            hidePassword: '',
                            userId: data.id
                        });
                        this.passwordRef.current.focus();
                    } else {
                        this.setState({alert: '', notificationMessage: 'We do not know you'});
                    }

                } catch (err) {
                    this.setState({alert: '', notificationMessage: 'We do not know you'});
                }
                await this.setState({loading: false});
            }

        } else if (event.key === 'Enter' && from === 'password') {
            this.doLogin(event);
        } else {
            //do nothing
        }
    };

    render() {
        const loginLabel = {emailAddressText: 'Email Address', passwordText: 'Password', buttonText: 'Login'};
        const {email, password, invalidEmail, invalidPassword, alert, hideEmail, hidePassword, notificationMessage, loading} = this.state;
        return (
            <div className='login main'>
                <Modal visible={loading}>
                    <div class="spinner-border" role="status">
                    </div>
                    <div><strong>Loading...</strong></div>
                </Modal>
                <div className="d-flex flex-column login container">
                    <div className="d-flex align-items-center login containerCenter">
                        <div className="d-flex justify-content-end login containerEnd">
                            <div className="card w-50 login backgroundColorCard">
                                <div className="card-body">
                                    <h2 className="login labelInput"><i class="fas fa-child"></i> My Awesome Project
                                    </h2>
                                    <br/>
                                    <div className={`alert alert-danger ${alert}`} role="alert">
                                        {notificationMessage}
                                    </div>
                                    <div>
                                        <div className={`form-group ${hideEmail}`}>
                                            <label className=" login labelInput"
                                                   htmlFor=" exampleInputEmail1">{loginLabel.emailAddressText}</label>
                                            <input ref={this.emailRef} type=" text"
                                                   className={`form-control ${invalidEmail} login inputText`}
                                                   id=" exampleInputEmail1"
                                                   placeholder=" Enter email" value={email}
                                                   onChange={this.onEmailInputChange}
                                                   onKeyPress={(e) => this.onHandleKeyPress(e, 'email')}/>
                                            <div className=" invalid-feedback">
                                                Please enter an email in the input.
                                            </div>
                                            <small id=" emailHelp" className=" form-text text-muted">We'll never share
                                                your
                                                email
                                                with
                                                anyone
                                                else.
                                            </small>
                                        </div>
                                        <div className={`form-group login ${hidePassword}`}>
                                            <label className=" login labelInput"
                                                   htmlFor=" exampleInputPassword1">{loginLabel.passwordText}</label>
                                            <input ref={this.passwordRef} type="password"
                                                   className={`form-control ${invalidPassword} login inputText`}
                                                   id=" exampleInputPassword1"
                                                   onChange={this.onPasswordInputChange}
                                                   onKeyPress={(e) => this.onHandleKeyPress(e, 'password')}
                                                   value={password}
                                                   placeholder=" Password"/>
                                            <div className=" invalid-feedback">
                                                Please enter your password in the input.
                                            </div>
                                        </div>
                                        <button type=" submit"
                                                className={`btn btn-primary login inputButton ${hidePassword} awesome-button-sm`}
                                                onClick={this.doLogin}><i
                                            class="fas fa-sign-in-alt"></i> {loginLabel.buttonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = {
    authUser: authUser,
    changeUserSession: changeUserSession
};

export default connect(null, mapDispatchToProps)(Login);