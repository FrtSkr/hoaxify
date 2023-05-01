import React from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const { hoax, onDeleteHoax } = props;
    const { user, content, timestamp, fileAttachment, id } = hoax;
    const { username, displayName, image } = user;

    const { i18n } = useTranslation();

    const onClickDelete = async () => {
        try {
            const response = await deleteHoax(id);
            onDeleteHoax(id);
        } catch (error) {

        }
    }

    const formatted = format(timestamp, i18n.language);

    const ownedByLoggedInUser = loggedInUser == username;

    return (
        <div className='card p-1'>
            <div className='d-flex'>
                <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
                <div className='flex-fill m-auto ps-2'>
                    <Link to={`/user/${username}`} className='text-dark'>
                        <h6 className='d-inline'>
                            {displayName}@{username}
                        </h6>
                    </Link>
                </div>
                {ownedByLoggedInUser && <button className="btn btn-delete-link btn-sm" onClick={onClickDelete}>
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>}
            </div>
            <div className='text-start ms-1'>
                {content}
            </div>
            {fileAttachment && (
                <div className='text-center mx-1 my-1'>
                    {fileAttachment.fileType.startsWith('image') &&
                        (<img className='img-fluid' src={'images/attachments/' + fileAttachment.name} alt={content} />)}
                    {!fileAttachment.fileType.startsWith('image') &&
                        (<strong>Hoax has unknown attachment</strong>)}
                </div>
            )}
            <div className='text-end me-1 mb-1'>
                <span>{formatted}</span>
            </div>
        </div>
    );
};

export default HoaxView;