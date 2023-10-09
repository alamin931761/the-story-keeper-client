import React from 'react';
import { useForm } from 'react-hook-form';
import PageTitle from '../../Shared/PageTitle';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';

const AddBooks = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const newBook = {
            image: data.image,
            title: data.title,
            subtitle: data.subtitle,
            author: data.author,
            price: parseFloat(data.price),
            description: data.description,
            publisher: data.publisher,
            publication_date: data.publication_date,
            weight: data.weight,
            pages_quantity: (data.pages_quantity),
            dimensions: data.dimensions,
            isbn: parseInt(data.isbn),
            binding: data.binding,
            category: data.category,
            totalSales: 0
        };

        fetch('http://localhost:5000/allBooks', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => {
                if (data.acknowledged) {
                    toast.info("Book added successfully");
                }
            })
        reset();
    };

    return (
        <div data-aos="fade-right" data-aos-duration="1000">
            <PageTitle title="Add Books"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Add Books</h2>

            <form className='flex flex-col justify-center items-center mx-3' onSubmit={handleSubmit(onSubmit)}>
                {/* image URL */}
                <div className="form-control w-full" >
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

                {/* subtitle */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Subtitle</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("subtitle")} />
                </div>

                {/* author */}
                <div className="form-control w-full">
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
                <div className='w-full' >
                    <label className="label">
                        <span className="label-text">Description of the book</span>
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
                        <span className="label-text">Publication Date</span>
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
                    <input type="number" className='input input-bordered w-full' {...register("weight", {
                        required: {
                            value: true,
                            message: "Weight date field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.weight?.type === 'required' && <span className="label-text-alt text-red-400">{errors.weight.message}</span>}
                    </label>
                </div>

                {/* pages quantity */}
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Pages Quantity</span>
                    </label>
                    <input type="number" className="input input-bordered w-full mb-4" {...register("pages_quantity")} />
                </div>

                {/* dimensions */}
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Dimensions (MM)</span>
                    </label>
                    <input className="input input-bordered w-full mb-4" {...register("dimensions")} />
                </div>

                {/* isbn */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">ISBN</span>
                    </label>
                    <input type="number" className='input input-bordered w-full' {...register("isbn", {
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
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Binding</span>
                    </label>
                    <input className="input input-bordered w-full mb-4" {...register("binding")} />
                </div>

                {/* category  */}
                <div className='w-full'>
                    <select className="select select-warning w-full" {...register("category", {
                        required: {
                            value: true,
                            message: "Category field required, please select a category"
                        }
                    })}>
                        <option value="" className='text-gray-500'>Select a category</option>
                        <option value="essays">Essays</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="sci-fi-fantasy-and-horror">Sci-Fi, Fantasy & Horror</option>
                        <option value="arts-and-music">Arts & Music</option>
                        <option value="mystery-and-crime">Mystery & Crime</option>
                        <option value="poetry">Poetry</option>
                        <option value="rare-books">Rare Books</option>
                    </select>
                    <label className="label">
                        {errors.category?.type === 'required' && <span className="label-text-alt text-red-400">{errors.category.message}</span>}
                    </label>
                </div>
                <input className="btn btn-outline mb-4 transition ease-linear duration-500" type="submit" value="Add Book" />
            </form>
        </div>
    );
};

export default AddBooks;