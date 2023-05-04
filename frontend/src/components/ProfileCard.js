import React, { useEffect, useState } from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import ButtonWithProgress from './ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccess } from '../redux/authActions';
const ProfileCard = props => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { username: loggenInUsername } = useSelector(store => ({ username: store.username }))
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername == loggenInUsername);

    }, [pathUsername, loggenInUsername]);

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors, displayName: undefined

        }));
    }, [updatedDisplayName])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors, image: undefined

        }));
    }, [newImage])

    const { username, displayName, image } = user;
    const { t } = useTranslation();

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);


    const onChangeDisplayName = event => {
        const { value } = event.target;
        setUpdatedDisplayName(value);
    }

    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDisplayName,
            image
        }
        try {
            const response = await updateUser(username, body);
            setUser(response.data);
            setInEditMode(false);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        };
    };

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const pendingApiCall = useApiProgress('put', `/api/1.0/users/${username}`);
    const { displayName: displayNameError, image: imageError } = validationErrors;
    const editMode = (
        <>
            <Input label={t('Change Display Name')} defaultValue={displayName} onChange={onChangeDisplayName} error={displayNameError} />
            <br />
            <Input type='file' onChange={onChangeFile} error={imageError} /><br /><br />
            <div>

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
                    tempimage={newImage}
                />
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