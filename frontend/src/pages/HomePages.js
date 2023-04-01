import React from 'react';
import UserList from '../components/UserList';
import HoaxSubmit from '../components/HoaxSubmit';
import { useSelector } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';
const HomePages = () => {
    const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }));

    let userListClassName = 'col-6';
    if (isLoggedIn == false) {
        userListClassName = 'col-12';
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    {
                        isLoggedIn &&
                        <div className='mb-1'>
                            <HoaxSubmit />
                        </div>
                    }
                    <HoaxFeed />
                </div>
                <div className={userListClassName}>
                    <UserList />

                </div>
            </div>
        </div>
    );
};

export default HomePages;