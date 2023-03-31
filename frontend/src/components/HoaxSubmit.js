import React from 'react';
import { ProfileImageWithDefault } from './ProfileImageWithDefault';
import { useSelector } from 'react-redux';

const HoaxSubmit = () => {
    const { image } = useSelector(store => ({ image: store.image }));
    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle mx-1' />
            <div className='flex-fill'>
                <textarea className='form-control' />
                <div className='text-end mt-1'>
                    <button className='btn btn-primary'>Hoaxify</button>
                </div>
            </div>
        </div>
    );
};

export default HoaxSubmit;