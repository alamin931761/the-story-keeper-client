import React from 'react';
import { AiFillThunderbolt, AiFillLike } from 'react-icons/ai';
import { MdOutlineSecurity } from 'react-icons/md';
import { GiRoundStar } from 'react-icons/gi';

const Services = () => {
    return (
        <section className='common-style flex justify-around flex-wrap'>
            {/* quick delivery */}
            <div className='flex flex-col items-center border border-red-500'>
                <AiFillThunderbolt className='text-5xl' />
                <h2 className='text-2xl'>Quick Delivery</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            {/* secure payment */}
            <div className='flex flex-col items-center border border-red-500'>
                <MdOutlineSecurity className='text-5xl' />
                <h2 className='text-2xl'>Secure Payment</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            {/* Best Quality */}
            <div className='flex flex-col items-center border border-red-500'>
                <AiFillLike className='text-5xl' />
                <h2 className='text-2xl'>Best Quality</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            {/* Best Quality */}
            <div className='flex flex-col items-center border border-red-500'>
                <GiRoundStar className="text-5xl" />
                <h2 className='text-2xl'>Return Guarantee</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </section>
    );
};

export default Services;