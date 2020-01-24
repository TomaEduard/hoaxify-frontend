import React from 'react';
import logo from '../assets/hoaxify-logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TopBar extends React.Component {

    onClickLogout = () => {
        const action = {
            type: 'logout-success'
        }
        this.props.dispatch(action);
    }

    render() { 
        let links = (
            <ul className="navbar navbar-nav ml-auto">
                <li className="nav-item bg-transparent">
                    <Link to='/signup' className="nav-link topBarText" >
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/login' className="nav-link topBarText" >
                        Login
                    </Link>
                </li>
            </ul>
        );

        if(this.props.user.isLoggedIn) {
            links = (
            <ul className="nav navbar-nav ml-auto">
                <li className ="nav-item nav-link" onClick={this.onClickLogout}  style={{
                    cursor: 'pointer'
                }}>Logout</li>
                <li className ="nav-item">
                    <Link to={`/${this.props.user.username}`} className="nav-link">
                        My Profile
                    </Link>
                </li>
            </ul>
            )
        }

        return ( 
            <div className="bg-white shadow-sm mb-2">
                <div className="container">
                    <nav className="navbar navbar-light navbar-expand">
                        <Link to ="/" className="navbar-brand">
                            {/* <img src={logo} width="100" alt="Hoaxify" /> */}
                            <img src={logo} width="150" alt="Hoaxify" />
                            {/* <span className="topBar-text">Hoaxify</span> */}
                        </Link>
                        {links}
                    </nav>
                </div>
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        user: state
    };
};

export default connect(mapStateToProps)(TopBar);