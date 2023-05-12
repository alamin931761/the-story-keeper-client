import React from 'react';
import { useForm } from 'react-hook-form';
import PageTitle from '../../Shared/PageTitle';
import { toast } from 'react-toastify';
import Typewriter from 'typewriter-effect';

const AddBooks = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = data => {

        fetch('http://localhost:5000/allBooks', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.info("Book added successfully");
            })
        reset();
    };

    return (
        <section>
            <PageTitle title="Add Books"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Add Books'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

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

                {/* name */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Book Name</span>
                    </label>
                    <input type='text' className='input input-bordered w-full' {...register("name", {
                        required: {
                            value: true,
                            message: "Book name field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-400">{errors.name.message}</span>}
                    </label>
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
                <div className='w-full'>
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
                    <select className="select select-secondary w-full" {...register("category", {
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
                <input className="btn btn-primary mb-4" type="submit" />
            </form>
        </section>
    );
};

export default AddBooks;