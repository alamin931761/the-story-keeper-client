import React from 'react';
import { AiFillThunderbolt, AiFillLike } from 'react-icons/ai';
import { MdOutlineSecurity } from 'react-icons/md';
import { GiRoundStar } from 'react-icons/gi';

const Services = () => {
    return (
        <div className='mt-20 flex justify-around flex-wrap'>
            {/* quick delivery */}
            <div className='flex flex-col items-center my-5'>
                <AiFillThunderbolt className='text-5xl' />
                <h2 className='text-2xl'>Quick Delivery</h2>
                <p>100% fast delivery service</p>
            </div>

            {/* secure payment */}
            <div className='flex flex-col items-center my-5'>
                <MdOutlineSecurity className='text-5xl' />
                <h2 className='text-2xl'>Secure Payment</h2>
                <p>100% safe and secure payment service</p>
            </div>

            {/* Best Quality */}
            <div className='flex flex-col items-center my-5'>
                <AiFillLike className='text-5xl' />
                <h2 className='text-2xl'>Best Quality</h2>
                <p>100% best quality books</p>
            </div>

            {/* Return Guarantee */}
            <div className='flex flex-col items-center my-5'>
                <GiRoundStar className="text-5xl" />
                <h2 className='text-2xl'>Return Guarantee</h2>
                <p>Within 30 days return</p>
            </div>
        </div>
    );
};

export default Services;