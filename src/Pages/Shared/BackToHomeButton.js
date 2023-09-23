import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const BackToHomeButton = () => {
    return (
        <div className='flex justify-center my-6'>
            <Link className='btn btn-outline transition ease-linear duration-500' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
        </div>
    );
};

export default BackToHomeButton;