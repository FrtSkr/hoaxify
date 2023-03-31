import React, { useEffect, useState } from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { postHoax } from '../api/apiCalls';

const HoaxSubmit = () => {
    const { image } = useSelector(store => ({ image: store.image }));
    const [focused, setFocused] = useState(false);
    const { t } = useTranslation();
    const [hoax, setHoax] = useState('');

    useEffect(() => {
        if (!focused) {
            setHoax('');
        }

    }, [focused]);

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }

        try {
            const response = await postHoax(body);
        } catch (error) {

        }
    }

    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle mx-1' />
            <div className='flex-fill'>
                <textarea className='form-control'
                    onFocus={() => setFocused(true)}
                    rows={focused ? 3 : 1}
                    onChange={event => setHoax(event.target.value)}
                    value={hoax}
                />
                {focused && (<div className='text-end mt-1'>
                    <button className='btn btn-primary' onClick={onClickHoaxify}>Hoaxify</button>
                    <button
                        className='btn btn-light d-inline-flex'
                        style={{ marginLeft: '10px' }}
                        onClick={() => setFocused(false)}
                        disabled={false}>
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