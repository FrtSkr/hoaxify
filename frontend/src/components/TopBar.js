
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import logo from '../assets/hoaxify.png';

class TopBar extends Component {

    state = {
        isLoggedIn: false,
        username: 'user1'
    }




    render() {
        const { t } = this.props;
        const { isLoggedIn, username } = this.state;

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

        this.setState({ isLoggedIn: this.props.isLoggedIn })
        if (isLoggedIn) {
            links = (<ul className="navbar-nav ml-auto">
                <li>
                    <Link className='nav-link' to={`/user/${username}`}>
                        {username}
                    </Link>
                </li>
                <li>
                    <Link className='nav-link'>
                        {t('Logout')}
                    </Link>
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
export default withTranslation()(TopBar);