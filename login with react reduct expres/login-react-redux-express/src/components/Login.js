import React from 'react';
import { authEmail, authPass } from '../api/user'
import { connect } from 'react-redux'
import { addUserInfo, isAuth } from '../actions'

class Login extends React.Component {
    state = { email: '', pass: '', showEm: '', showPw: 'd-none', alert: 'd-none', notificationMessage:'' }

    onKeyEmail = async (event) => {
        if (event.key === 'Enter') {
            const response = await authEmail(this.state.email)
            const data = await response.json()
            if (data.status === 'ok') {
                this.setState({ showEm: 'd-none', showPw: '', alert: 'd-none' })
            } else {
                this.setState({ alert: '',notificationMessage:'invalid email' })
            }
        }
    }

    onKeyPass = async (event) => {
        if (event.key === 'Enter') {
            const response = await authPass(this.state.pass)
            const data = await response.json()
            if (data.status === 'ok') {
                this.props.addUserInfo(data)
                this.props.isAuth(true)
                this.props.history.push({ pathname: '/MainContent' })
            } else {
                this.setState({ alert: '',notificationMessage:'invalid password' })
            }
        }
    }

    onNameChange = async (event) => {
        await this.setState({ email: event.target.value })
        console.log(this.state.email)
    }

    onPwChange = async (event) => {
        await this.setState({ pass: event.target.value })
        console.log(this.state.pass)
    }

    render() {
         return (
            <div className="container mt-5">
                <div class="card text-center">
                    <div class="card-header">
                        <h3>Login</h3>
                    </div>
                    <div >
                        <div className={this.state.showEm}>
                            <div class={`alert alert-danger ${this.state.alert}`} role="alert">
                                Email Salah !!!
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email : </label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email" onKeyPress={this.onKeyEmail} onChange={this.onNameChange} />
                                </div>
                            </div>
                        </div>

                        <div className={this.state.showPw}>
                            <div class={`alert alert-danger ${this.state.alert}`} role="alert">
                                Password Salah !!!
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Password : </label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password" onKeyPress={this.onKeyPass} onChange={this.onPwChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                </div>
            </div>
        )
    }
}

export default connect(null, { addUserInfo: addUserInfo, isAuth: isAuth })(Login)