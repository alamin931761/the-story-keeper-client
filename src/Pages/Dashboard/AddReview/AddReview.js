import React from 'react';
import './AddReview.css';
import { useState } from 'react';
import { StarPicker } from 'react-star-picker';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const [rating, setRating] = useState(null);

    const onChange = (value) => {
        setRating(value);
    };

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const review = {
            rating: rating,
            name: user.displayName,
            image: data.image,
            review: data.review
        };

        // Save review to the database 
        const url = `http://localhost:5000/review`;
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
                toast.info("Review submitted successfully");
            });
        reset();
    }

    return (
        <section className='pt-16'>
            <h2 className='text-2xl text-center'>Leave a Review</h2>

            {/* ratings  */}
            <div className='flex justify-center mb-5 mt-2'>
                <StarPicker onChange={onChange} value={rating} halfStars={true} doubleTapResets={true} numberStars={5} size={54} className='enlargeStar'
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                <input value={user.displayName} className='input input-bordered w-full max-w-lg mb-4' disabled />

                {/* image  */}
                <div className="form-control w-full max-w-lg">
                    <input className='input input-bordered w-full max-w-lg' placeholder='Image URL' {...register("image", {
                        required: {
                            value: true,
                            message: "Image URL field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-400">{errors.image.message}</span>}
                    </label>
                </div>

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

                <button disabled={rating === null} type='submit' className='btn btn-success'>Add Review</button>
            </form>
        </section >
    );
};

export default AddReview;