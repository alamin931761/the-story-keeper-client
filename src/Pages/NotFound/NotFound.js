import React from 'react';
import PageTitle from '../Shared/PageTitle';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import notFound from '../../assets/images/not-found.png'

const NotFound = () => {
    return (
        <div className='common-style'>
            <PageTitle title='404'></PageTitle>
            <div>
                <img src={notFound} alt="Page Not Found" />
            </div>

            <div className='flex flex-col items-center mt-10'>
                <p className='text-xl mb-5'>We're sorry the page you requested could not be found.</p>
                <p className='text-lg mb-5'>Please go back to the homepage</p>
                <Link className='btn btn-outline mb-5' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default NotFound;