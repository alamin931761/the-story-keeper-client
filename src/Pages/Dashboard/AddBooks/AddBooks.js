import React from 'react';
import { useForm } from 'react-hook-form';

const AddBooks = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        reset();
    };

    return (
        <section>
            <form className='flex flex-col justify-center items-center mx-3' onSubmit={handleSubmit(onSubmit)}>

                {/* image URL */}
                <div className="form-control w-full">
                    <input type='text' className='input input-bordered w-full' placeholder='Image URL' {...register("image", {
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
                    <input type='text' className='input input-bordered w-full' placeholder="Book name" {...register("name", {
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
                    <input type='text' className='input input-bordered w-full' placeholder='Author' {...register("author", {
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
                    <input type='number' className='input input-bordered w-full' placeholder='Price' {...register("price", {
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
                <textarea className="textarea textarea-bordered w-full mb-4 text-base" placeholder="Description of the book" cols="30" rows="5" {...register("description")}></textarea>

                {/* publisher */}
                <div className="form-control w-full">
                    <input type='text' className='input input-bordered w-full' placeholder='Publisher' {...register("publisher", {
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
                    <input type="number" className='input input-bordered w-full' placeholder='Weight' {...register("weight", {
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
                <input type="number" className="input input-bordered w-full mb-4" placeholder='Pages quantity' {...register("pages_quantity")} />

                {/* dimensions */}
                <input className="input input-bordered w-full mb-4" placeholder='Dimensions' {...register("dimensions")} />

                {/* isbn */}
                <div className="form-control w-full">
                    <input type="number" className='input input-bordered w-full' placeholder='ISBN' {...register("isbn", {
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
                <input className="input input-bordered w-full mb-4" placeholder='Binding' {...register("binding")} />

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