import React, { useEffect } from 'react';
import './AddReview.css';
import { useState } from 'react';
import { StarPicker } from 'react-star-picker';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PageTitle from '../../Shared/PageTitle';
import { signOut } from 'firebase/auth';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const [rating, setRating] = useState(null);
    const [profilePicture, setProfilePicture] = useState("");

    const onChange = (value) => {
        setRating(value);
    };

    // load user profile picture
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`)
            .then(res => res.json())
            .then(data => setProfilePicture(data[0].imageURL))
    }, [])

    // default image 
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
        const url = `http://localhost:5000/review`;
        fetch(url, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(result => {
                if (result.acknowledged) {
                    toast.info("Review submitted successfully");
                } else {
                    toast.error("Review was not successfully submitted");
                }
            });
        reset();
    }

    return (
        <div>
            <PageTitle title="Add Review"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Add Review</h2>

            <h2 className='text-xl text-center mt-12'>Leave a Review</h2>

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

                <button disabled={rating === null} type='submit' className='btn btn-outline mb-6'>Add Review</button>
            </form>
        </div >
    );
};

export default AddReview;