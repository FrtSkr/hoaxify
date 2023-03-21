import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
const ProfileCard = props => {
    const [inEditMode, setInEditMode] = useState(false);
    // const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const { user } = props;
    const { username, displayName, image } = user;
    const { t } = useTranslation();


    const editMode = (
        <>
            <Input label={t('Change Display Name')} />
            <br />
            <div>
                <button className='btn btn-primary d-inline-flex'>
                    <span class="material-symbols-outlined">
                        save
                    </span>
                    {t('Save')}
                </button>
                <button className='btn btn-light d-inline-flex' style={{ marginLeft: '10px' }} onClick={() => setInEditMode(false)}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                    {t('Cancel')}
                </button>
            </div>
        </>
    );

    const withoutEditMode = (<div>
        <h3>
            {displayName}@{username}
        </h3>
        <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
            <span className="material-symbols-outlined">edit</span>
            {t('Edit')}
        </button>
    </div>);
    return (
        <div className='card text-center'>
            <div className='card-header'>
                <ProfileImageWithDefault className='rounded-circle shadow' width="200" height="200" alt='user profile image' image={image} />
            </div>
            <div className='card-body'>
                {!inEditMode ?
                    withoutEditMode
                    :
                    editMode
                }
            </div>
        </div >
    );
};

export default ProfileCard;