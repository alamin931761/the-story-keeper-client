import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsArrowLeft } from 'react-icons/bs';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import PageTitle from '../../../Shared/PageTitle';

const EditBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const navigate = useNavigate('');

    useEffect(() => {
        fetch(`https://the-story-keeper-server-ebon.vercel.app/editBook/${id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                } else if (res.status === 404) {
                    navigate('404');
                }
                return res.json();
            })
            .then(data => setBook(data))
    }, [book, id, navigate])

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const author = data.author;
        const binding = data.binding;
        const description = data.description;
        const dimensions = data.dimensions;
        const image = data.image;
        const isbn = parseInt(data.isbn);
        const title = data.title;
        const subtitle = data.subtitle;
        const pages_quantity = (data.pages_quantity);
        const price = parseFloat(data.price);
        const publication_date = data.publication_date;
        const publisher = data.publisher;
        const weight = (data.weight);

        // send edited book data to database
        fetch(`https://the-story-keeper-server-ebon.vercel.app/allBooks/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ author, binding, description, dimensions, image, isbn, title, subtitle, pages_quantity, price, publication_date, publisher, weight })
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.info('Book edited successfully')
                }
            })
        reset();
    };

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title='Edit Book'></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>{book.title}</h2>

            <form className='flex flex-col justify-center items-center mx-3' onSubmit={handleSubmit(onSubmit)}>
                {/* image URL */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("image", {
                        required: {
                            value: true,
                            message: "Image URL field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-400">{errors.image.message}</span>}
                    </label>
                </div>

                {/* title */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("title", {
                        required: {
                            value: true,
                            message: "Title field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.title?.type === 'required' && <span className="label-text-alt text-red-400">{errors.title.message}</span>}
                    </label>
                </div>

                {/* sub title */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Subtitle</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("subtitle", {
                    })} />
                </div>

                {/* author */}
                <div className="form-control w-full mt-4">
                    <label className="label">
                        <span className="label-text">Author</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("author", {
                        required: {
                            value: true,
                            message: "Author field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.author?.type === 'required' && <span className="label-text-alt text-red-400">{errors.author.message}</span>}
                    </label>
                </div>

                {/* price */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type='number' className='input input-bordered w-full' {...register("price", {
                        required: {
                            value: true,
                            message: "Price field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.price?.type === 'required' && <span className="label-text-alt text-red-400">{errors.price.message}</span>}
                    </label>
                </div>

                {/* description  */}
                <div className='w-full'>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full mb-4 text-base" cols="30" rows="5" {...register("description")}></textarea>
                </div>

                {/* publisher */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Publisher</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("publisher", {
                        required: {
                            value: true,
                            message: "Publisher field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.publisher?.type === 'required' && <span className="label-text-alt text-red-400">{errors.publisher.message}</span>}
                    </label>
                </div>

                {/* publication date */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Publication date</span>
                    </label>
                    <input type="date" className='input input-bordered w-full' {...register("publication_date", {
                        required: {
                            value: true,
                            message: "Publication date field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.publication_date?.type === 'required' && <span className="label-text-alt text-red-400">{errors.publication_date.message}</span>}
                    </label>
                </div>

                {/* weight */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Weight</span>
                    </label>
                    <input type="number" className='input input-bordered w-full'  {...register("weight", {
                        required: {
                            value: true,
                            message: "Weight field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.weight?.type === 'required' && <span className="label-text-alt text-red-400">{errors.weight.message}</span>}
                    </label>
                </div>

                {/* pages quantity */}
                <div className='w-full'>
                    <label className="label">
                        <span className="label-text">Pages Quantity</span>
                    </label>
                    <input type="number" className="input input-bordered w-full mb-4" {...register("pages_quantity")} />
                </div>

                {/* dimensions */}
                <div className='w-full'>
                    <label className="label">
                        <span className="label-text">Dimensions</span>
                    </label>
                    <input className="input input-bordered w-full mb-4" {...register("dimensions")} />
                </div>

                {/* isbn */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">ISBN</span>
                    </label>
                    <input className='input input-bordered w-full' {...register("isbn", {
                        required: {
                            value: true,
                            message: "isbn field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.isbn?.type === 'required' && <span className="label-text-alt text-red-400">{errors.isbn.message}</span>}
                    </label>
                </div>

                {/* binding */}
                <div className='w-full'>
                    <label className="label">
                        <span className="label-text">Binding</span>
                    </label>
                    <input className="input input-bordered w-full mb-4" {...register("binding")} />
                </div>
                <input className="btn btn-outline mb-6 transition ease-linear duration-500" type="submit" value="update" />
            </form>

            <div className='flex justify-center mb-6'>
                <Link className='btn btn-outline transition ease-linear duration-500' to='/dashboard/manageBooks'><BsArrowLeft className='text-2xl mr-2' />Back to Manage Books</Link>
            </div>
        </div>
    );
};

export default EditBook;