import React from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import PageTitle from '../Shared/PageTitle';

const Blogs = () => {
    return (
        <div className='common-style'>
            <PageTitle title='Blogs'></PageTitle>
            <div className='text-4xl flex justify-center mt-4'>
                <Typewriter
                    options={{
                        strings: ['Coming Soon'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='flex justify-center my-6'>
                <Link className='flex items-center btn btn-outline' to='/home'><MdKeyboardBackspace className='mr-2 text-2xl' /> Back To Home </Link>
            </div>
        </div>
    );
};

export default Blogs;