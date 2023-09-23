import React, { useEffect } from 'react';
import './AddReview.css';
import { useState } from 'react';
import { StarPicker } from 'react-star-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import auth from '../../../../firebase.init';
import PageTitle from '../../../Shared/PageTitle';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate('');
    const [rating, setRating] = useState(null);
    const [bookDetails, setBookDetails] = useState({});
    const { image, title, subtitle, author, price, description, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding } = bookDetails;
    const { id } = useParams();

    // load book details 
    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`)
            .then(res => res.json())
            .then(data => setBookDetails(data));
    }, [id, bookDetails])

    // ratings 
    const onChange = (value) => {
        setRating(value);
    };

    // date 
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August ", "September", "October", "November", "December"];
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const date = today.getDate();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const review = {
            rating: rating,
            review: data.review,
            name: user?.displayName,
            email: user?.email,
            today: `${date} ${month} ${year}`,
        };

        // reviews 
        let reviews = [];
        if (bookDetails.reviews) {
            reviews = [...bookDetails.reviews, review];
        } else {
            reviews = [review];
        }
        bookDetails.reviews = reviews;

        // save review to the database
        fetch(`http://localhost:5000/book/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ image, title, subtitle, author, price, description, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding, reviews })
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    navigate('/signIn');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.info("Review submitted successfully");
                    setTimeout(() => {
                        navigate(`/bookDetails/${id}`);
                    }, 5000);
                } else {
                    toast.error("Review was not successfully submitted");
                }
            })
        reset();
    }

    return (
        <div className='common-style' data-aos="fade-left" data-aos-duration="1000">
            <PageTitle title="Add Review"></PageTitle>
            <h2 className='text-3xl text-center my-6 second-font'>Leave a Review</h2>

            {/* ratings  */}
            <div className='my-6 flex flex-col items-center'>
                <p className='w-full max-w-lg text-sm'>Ratings</p>
                <div className='w-full max-w-lg'>
                    <StarPicker onChange={onChange} value={rating} halfStars={true} doubleTapResets={true} numberStars={5} size={54} className='enlargeStar'
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                <div className='w-full max-w-lg mb-4'>
                    <label className="label">
                        <span className="label-text">Book Name</span>
                    </label>
                    <input value={bookDetails.title} className='input input-bordered w-full max-w-lg' disabled />
                </div>

                {/* review  */}
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Review content</span>
                    </label>
                    <textarea className="textarea textarea-bordered text-base" cols="33" rows="5" {...register("review", {
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

                <button disabled={rating === null} type='submit' className='btn btn-outline mb-6'>Submit</button>
            </form>
            <div className='flex justify-center mb-6'>
                <Link className='btn btn-outline' to={`/bookDetails/${id}`}><MdKeyboardBackspace className='text-2xl mr-2' />Back to Details page</Link>
            </div>
        </div >
    );
};

export default AddReview;