import React from 'react';
import { GiPartyPopper } from 'react-icons/gi';
import PageTitle from '../../Shared/PageTitle';

const Welcome = () => {
    return (
        <div className='h-[95%]'>
            <PageTitle title="Dashboard"></PageTitle>
            <div className='h-full flex justify-center items-center mt-4' data-aos="fade-right" data-aos-duration="3000">
                <GiPartyPopper className='inline text-4xl' />
                <h2 className='text-xl'>Welcome to the Dashboard</h2>
                <GiPartyPopper className='inline text-4xl' />
            </div>
        </div>
    );
};

export default Welcome;