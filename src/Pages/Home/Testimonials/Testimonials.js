import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Testimonial from './Testimonial/Testimonial';
import Loading from '../../Shared/Loading';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => setTestimonials(data))
    }, [testimonials])

    if (testimonials.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl text-center'>Why Our Customers Love Us?</h2>
            <div className='flex justify-evenly flex-wrap'>
                {
                    testimonials.map(data => <Testimonial key={data._id} data={data}></Testimonial>)
                }
            </div>
        </div>
    );
};

export default Testimonials;