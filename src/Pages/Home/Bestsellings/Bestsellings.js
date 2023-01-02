import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Bestsellings = () => {
    return (
        <section>
            <div className='flex justify-between'>
                <h2 className='text-3xl'>Bestselling Books</h2>
                <Link to='/#####'>View all <BsArrowRight className='inline' /></Link>
            </div>
        </section>
    );
};

export default Bestsellings;