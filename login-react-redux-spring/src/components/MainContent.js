import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    showProduct = () => {
        this.props.history.push({
            pathname: '/Product'
        })
    }

    showCategory = () => {
        this.props.history.push({
            pathname: '/Category'
        })
    }

    doLogout = () => {
        this.props.history.push({
            pathname: '/'
        });
    }

    navbar = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Welcome {this.props.userInfo.userFullName}    </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={this.showProduct} href="#">Product<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" onClick={this.showCategory} href="#">Category<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.doLogout} href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

    render() {
        return (
            <div>
                {this.navbar()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.email)
    return {
        userInfo: state.user
    }
}

export default connect(mapStateToProps)(Main)