import React, { useEffect } from 'react';
import './AddReview.css';
import { useState } from 'react';
import { StarPicker } from 'react-star-picker';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Typewriter from 'typewriter-effect';
import PageTitle from '../../Shared/PageTitle';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const [rating, setRating] = useState(null);
    const [profilePicture, setProfilePicture] = useState("");

    const onChange = (value) => {
        setRating(value);
    };

    // load user profile picture
    useEffect(() => {
        fetch(`https://the-story-keeper-server-ten.vercel.app/user/${user.email}`, {
            method: "GET",
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'content-type': 'application/json'
        })
            .then(res => res.json())
            .then(data => setProfilePicture(data[0].imageURL))
    }, [])

    // image 
    const image = 'https://i.ibb.co/4WCwkWc/user-default-image.png';
    let picture = '';
    if (profilePicture) {
        picture = profilePicture;
    } else {
        picture = image;
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const review = {
            rating: rating,
            name: user.displayName,
            image: picture,
            review: data.review
        };

        // Save review to the database 
        const url = `https://the-story-keeper-server-ten.vercel.app/review`;
        fetch(url, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(result => {
                if (result?.message) {
                    toast.error("Review was not successfully submitted")
                } else {
                    toast.info("Review submitted successfully");
                }
            });
        reset();
    }

    return (
        <section>
            <PageTitle title="Add Review"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-10 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Add Review'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <h2 className='text-3xl text-center'>Leave a Review</h2>

            {/* ratings  */}
            <div className='flex justify-center mb-5 mt-2'>
                <StarPicker onChange={onChange} value={rating} halfStars={true} doubleTapResets={true} numberStars={5} size={54} className='enlargeStar'
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                <input value={user.displayName} className='input input-bordered w-full max-w-lg mb-4' disabled />

                {/* review  */}
                <div className="form-control w-full max-w-lg">
                    <textarea className="textarea textarea-bordered text-base" placeholder="Review content" cols="33" rows="5" {...register("review", {
                        required: {
                            value: true,
                            message: "Review content field is required"
                        },
                        minLength: {
                            value: 10,
                            message: "Review content should be 10 characters or longer"
                        }
                    })} />
                    <label className="label">
                        {errors.review?.type === 'required' && <span className="label-text-alt text-red-400">{errors.review.message}</span>}
                        {errors.review?.type === 'minLength' && <span className="label-text-alt text-red-400">{errors.review.message}</span>}
                    </label>
                </div>

                <button disabled={rating === null} type='submit' className='btn btn-outline'>Add Review</button>
            </form>
        </section >
    );
};

export default AddReview;