import React from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Blogs = () => {
    return (
        <section className='common-style'>
            <div className='text-5xl flex justify-center mt-4'>
                <Typewriter
                    options={{
                        strings: ['Coming Soon'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='flex justify-center mt-10'>
                <Link className='flex items-center btn btn-outline' to='/home'><MdKeyboardBackspace className='mr-2 text-2xl' /> Back To Home </Link>
            </div>
        </section>
    );
};

export default Blogs;