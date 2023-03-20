import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const UserPage = props => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { username } = useParams();
    const { t } = useTranslation();
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

    return (
        !notFound ?
            <div className='container'>
                <ProfileCard user={user} />
            </div> :


            <div className='container'>
                <div className='alert alert-danger text-center'>
                    <div>
                        <span class="material-symbols-sharp" style={{ fontSize: '48px' }}>
                            report
                        </span>
                    </div>
                    {t('User not found')}
                </div>
            </div>
    );
};



export default UserPage;