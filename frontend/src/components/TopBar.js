
import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import logo from '../assets/hoaxify.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';

const TopBar = props => {

    const { t } = useTranslation();
    const { isLoggedIn, username, displayName, image } = useSelector(store => ({

        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image

    }));
    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }
    let links = (
        <ul className="navbar-nav ms-auto">
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
        links = (<ul className="navbar-nav ms-auto">
            <li className='nav-item dropdown'>
                <div className='d-flex' style={{ cursor: 'pointer' }}>
                    <ProfileImageWithDefault className="rounded-circle m-auto" image={image} width="32" height="32" />
                    <span className='nav-link dropdown-toggle'>{displayName}</span>
                </div>
                <div className='dropdown-menu show p-0 shadow'>
                    <Link className='dropdown-item d-flex p-2' to={`/user/${username}`}>
                        <span class="material-symbols-outlined text-info ms-2">
                            person
                        </span>
                        {t('Profile')}
                    </Link>

                    <span className='dropdown-item d-flex p-2' onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                        <span class="material-symbols-outlined text-danger ms-2">
                            power_settings_new
                        </span>
                        {t('Logout')}
                    </span>
                </div>
            </li>
        </ul>);
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




export default TopBar;