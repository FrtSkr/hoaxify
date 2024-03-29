import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { Spinner } from '../components/Spinner';
import HoaxFeed from '../components/HoaxFeed';

const UserPage = props => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { username } = useParams();
    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('get', `/api/1.0/users/${username}`, true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
                setNotFound(false);
            } catch (error) {
                setNotFound(true);
            }
        };
        loadUser();
    }, [username]);

    if (notFound) {
        return (
            <div className='container'>
                <div className='alert alert-danger text-center'>
                    <div>
                        <span class="material-symbols-outlined" style={{ fontSize: '48px' }}>
                            report
                        </span>
                    </div>
                    {t('User not found')}
                </div>
            </div>);
    }

    if (pendingApiCall || username != user.username) {
        return <Spinner />;
    };

    return (
        <div className='row'>
            <div className='col'>
                <div className='container'>
                    <ProfileCard user={user} />
                </div>
            </div>
            <div className='col'>
                <HoaxFeed />
            </div>
        </div>
    );




};



export default UserPage;