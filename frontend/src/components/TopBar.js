
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import logo from '../assets/hoaxify.png';
import { connect } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
// import { Authentication } from '../shared/AuthenticationContext';

class TopBar extends Component {

    //  static contextType = Authentication;

    render() {
        const { t, isLoggedIn, username, onLogoutSuccess } = this.props;
        let links = (
            <ul className="navbar-nav ml-auto">
                <li>
                    <Link className='nav-link' to='/login'>
                        {t('Login')}
                    </Link>
                </li>
                <li>
                    <Link className='nav-link' to='/signup'>
                        {t('Sign Up')}
                    </Link>
                </li>
            </ul>
        );

        if (isLoggedIn) {
            links = (<ul className="navbar-nav ml-auto">
                <li>
                    <Link className='nav-link' to={`/user/${username}`}>
                        {username}
                    </Link>
                </li>

                <li className='nav-link' onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                    {t('Logout')}
                </li>

            </ul>)
        }
        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" alt="Hoaxify Logo" />
                        Hoaxify
                    </Link>

                    {links}
                </nav>
            </div>
        );



    }
}

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () => dispatch(logoutSuccess())

    };
};

const TopBarWithTranslation = withTranslation()(TopBar);
export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);