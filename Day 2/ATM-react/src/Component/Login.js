import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        pin: '',
    }

    keyPressPin = (event) => {
        if (event.key === "Enter") {
            if (this.state.pin === '123456') {
                this.props.pin(this.state.pin)
                this.props.history.push({ pathname: '/Menu' })
                this.props.setLogin(true)

                let myMoney = JSON.parse(window.localStorage.getItem('money'))
                if (!myMoney) {
                    myMoney = { initialAmount: "9000000", remains: "9000000" };
                    window.localStorage.setItem('money', JSON.stringify(myMoney));

                }

            } else {
                alert('Pin salah')
            }
        }
    }

    doInputPinChange = (event) => {
        this.setState({ pin: event.target.value });
        console.log(this.state.pin)
    };

    doTransaction = () => {
        if (this.state.pin === '123456') {
            this.props.pin(this.state.pin)
            this.props.history.push({ pathname: '/Menu' })
            this.props.setLogin(true)

            let myMoney = JSON.parse(window.localStorage.getItem('money'))
            if (!myMoney) {
                myMoney = { initialAmount: "9000000", remains: "9000000" };
                window.localStorage.setItem('money', JSON.stringify(myMoney));
            }

        } else {
            alert('Pin salah')
        }
    }

    render() {

        return (
            <div className="container">
                <div className="d-flex justify-content-end">
                    <div className="form-group">
                        <input type="password" className="form-control" onKeyPress={this.keyPressPin} placeholder='PIN' onChange={this.doInputPinChange} />
                    </div>
                    <div className="form-group">
                        <button type="button" className="form-control btn btn"
                            onClick={() => {
                                this.doTransaction()
                            }}>Login
                    </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;
