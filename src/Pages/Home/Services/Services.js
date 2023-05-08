import React from 'react';
import { AiFillThunderbolt, AiFillLike } from 'react-icons/ai';
import { MdOutlineSecurity } from 'react-icons/md';
import { GiRoundStar } from 'react-icons/gi';

const Services = () => {
    return (
        <section className='mt-20 flex justify-around flex-wrap'>
            {/* quick delivery */}
            <div className='flex flex-col items-center'>
                <AiFillThunderbolt className='text-5xl' />
                <h2 className='text-2xl'>Quick Delivery</h2>
                <p>100% fast delivery service</p>
            </div>

            {/* secure payment */}
            <div className='flex flex-col items-center'>
                <MdOutlineSecurity className='text-5xl' />
                <h2 className='text-2xl'>Secure Payment</h2>
                <p>100% safe and secure payment service</p>
            </div>

            {/* Best Quality */}
            <div className='flex flex-col items-center'>
                <AiFillLike className='text-5xl' />
                <h2 className='text-2xl'>Best Quality</h2>
                <p>100% best quality books</p>
            </div>

            {/* Best Quality */}
            <div className='flex flex-col items-center'>
                <GiRoundStar className="text-5xl" />
                <h2 className='text-2xl'>Return Guarantee</h2>
                <p>100% Money Back Guarantee on eBooks</p>
            </div>
        </section>
    );
};

export default Services;