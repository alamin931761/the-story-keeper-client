import React from 'react';
import { StarPicker } from 'react-star-picker';

const Testimonial = ({ data }) => {
    const { name, image, rating, review } = data;

    return (
        <div className='bg-white border border-red-500 rounded-2xl drop-shadow-2xl mb-10 text-center p-5'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={image} alt='' />
                </div>
            </div>
            <p>{name}</p>
            <StarPicker value={rating} halfStars={true} numberStars={5} size={54} className='enlargeStar' />
            <p>{review}</p>
        </div>
    );
};

export default Testimonial;