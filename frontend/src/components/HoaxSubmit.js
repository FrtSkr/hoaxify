import React, { useEffect, useState } from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { postHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
const HoaxSubmit = () => {
    const { image } = useSelector(store => ({ image: store.image }));
    const [focused, setFocused] = useState(false);
    const { t } = useTranslation();
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
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

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid';
    }
    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');

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
                {focused && (<div className='text-end mt-1'>
                    <ButtonWithProgress
                        className='btn btn-primary'
                        onClick={onClickHoaxify}
                        pendingApiCall={pendingApiCall}
                        disabled={pendingApiCall}
                        text="Hoaxify"
                    />
                    <button
                        className='btn btn-light d-inline-flex'
                        style={{ marginLeft: '10px' }}
                        onClick={() => setFocused(false)}
                        disabled={pendingApiCall}
                    >
                        <span className="material-symbols-outlined">
                            close
                        </span>
                        {t('Cancel')}
                    </button>


                </div>)}

            </div>
        </div>
    );
};

export default HoaxSubmit;