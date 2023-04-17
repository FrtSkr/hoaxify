import React, { useEffect, useState } from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';
const HoaxSubmit = () => {
    const { image } = useSelector(store => ({ image: store.image }));
    const [focused, setFocused] = useState(false);
    const { t } = useTranslation();
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const [newImage, setNewImage] = useState();


    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [hoax]);

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }

        try {
            const response = await postHoax(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }

        }
    }

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
        uploadFile(file);
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        await postHoaxAttachment(attachment);
    }

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid';
    }
    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
    const pendingFileUpload = useApiProgress('post', '/api/1.0/hoax-attachments', true);

    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle mx-1' />
            <div className='flex-fill'>
                <textarea className={textAreaClass}
                    onFocus={() => setFocused(true)}
                    rows={focused ? 3 : 1}
                    onChange={event => setHoax(event.target.value)}
                    value={hoax}
                />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {focused && (
                    <>
                        {!newImage && <Input type="file" onChange={onChangeFile} />}
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload} />}
                        <div className='text-end mt-1'>
                            <ButtonWithProgress
                                className='btn btn-primary'
                                onClick={onClickHoaxify}
                                pendingApiCall={pendingApiCall}
                                disabled={pendingApiCall || pendingFileUpload}
                                text="Hoaxify"
                            />
                            <button
                                className='btn btn-light d-inline-flex'
                                style={{ marginLeft: '10px' }}
                                onClick={() => setFocused(false)}
                                disabled={pendingApiCall || pendingFileUpload}>
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                                {t('Cancel')}
                            </button>

                        </div>
                    </>)}

            </div>
        </div>
    );
};

export default HoaxSubmit;