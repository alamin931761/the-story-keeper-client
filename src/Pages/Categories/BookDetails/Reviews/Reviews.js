import React, { useEffect, useState } from 'react';
import { StarPicker } from 'react-star-picker';

const Reviews = ({ data }) => {
    const { rating, name, email, today, review } = data;
    const [profilePicture, setProfilePicture] = useState('');



    // load user profile picture
    useEffect(() => {
        fetch(`http://localhost:5000/user/${email}`)
            .then(res => res.json())
            .then(data => setProfilePicture(data[0].imageURL))
    }, [email, profilePicture])


    // image 
    const defaultImage = 'https://i.ibb.co/4WCwkWc/user-default-image.png';
    let image = '';
    if (profilePicture) {
        image = profilePicture;
    } else {
        image = defaultImage;
    }

    return (
        <div className='p-5 shadow-2xl bg-[#DFF6FF] rounded w-96' data-aos="flip-left" data-aos-duration="3000">
            <div className="avatar flex justify-center">
                <div className="w-32 mask rounded-full">
                    <img src={image} alt={name} />
                </div>
            </div>
            <div className='text-center mt-3'>
                <StarPicker value={rating} halfStars={true} size={40} className='enlargeStar' />
            </div>

            <p className='mt-3'><pre>{review}</pre></p>
            <p className='text-end text-xs mt-3'>By <span className='font-semibold'>{name}</span> on {today}</p>
        </div>
    );
};

export default Reviews;