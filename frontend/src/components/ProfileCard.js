import React, { useEffect, useState } from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import ButtonWithProgress from './ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProfileCard = props => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { username: loggenInUsername } = useSelector(store => ({ username: store.username }))
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername == loggenInUsername);

    }, [pathUsername, loggenInUsername]);

    const { username, displayName, image } = user;
    const { t } = useTranslation();

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
            console.log("girdi");
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);


    const onChangeDisplayName = event => {
        const { value } = event.target;
        setUpdatedDisplayName(value);
    }

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName,
            image: newImage
        }
        try {
            const resposen = await updateUser(username, body);
            setUser(resposen.data);
            setInEditMode(false);
        } catch (error) {

        };
    };

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const pendingApiCall = useApiProgress('put', `/api/1.0/users/${username}`);
    const editMode = (
        <>
            <Input label={t('Change Display Name')} defaultValue={displayName} onChange={onChangeDisplayName} />
            <br />
            <div>
                <input type='file' onChange={onChangeFile} /><br /><br />
                <ButtonWithProgress
                    className='btn btn-primary d-inline-flex'
                    onClick={onClickSave}
                    disabled={pendingApiCall}
                    pendingApiCall={pendingApiCall}
                    text={
                        <>
                            <span className="material-symbols-outlined">
                                save
                            </span>
                            {t('Save')}
                        </>
                    }
                />

                <button
                    className='btn btn-light d-inline-flex'
                    style={{ marginLeft: '10px' }}
                    onClick={() => setInEditMode(false)}
                    disabled={pendingApiCall}>
                    <span className="material-symbols-outlined">
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
        {editable && (<button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
            <span className="material-symbols-outlined">edit</span>
            {t('Edit')}
        </button>)}
    </div>);

    return (
        <div className='card text-center'>
            <div className='card-header'>
                <ProfileImageWithDefault
                    className='rounded-circle shadow'
                    width="200" height="200"
                    alt='user profile image'
                    image={image}
                    tempImage={newImage} />
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