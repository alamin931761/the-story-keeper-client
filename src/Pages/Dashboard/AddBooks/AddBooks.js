import React from 'react';
import { useForm } from 'react-hook-form';

const AddBooks = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <section className='pt-32'>
            <form className='flex flex-col justify-center items-center mx-3' onSubmit={handleSubmit(onSubmit)}>
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Image URL' {...register("image", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder="The first part of book's name" {...register("name", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder="The last part of the book's name" {...register("name2")} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Author' {...register("author", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Price' type="number" {...register("price", { required: true })} />

                <textarea className="textarea textarea-bordered w-full max-w-5xl mb-3 text-base" placeholder="The first part of the book's description" cols="30" rows="5" {...register("description")}></textarea>
                <textarea className="textarea textarea-bordered w-full max-w-5xl mb-3 text-base" placeholder="The last part of the book's description" cols="30" rows="5" {...register("description2")}></textarea>
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Publisher' {...register("publisher", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Publication Date' {...register("publication_date", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Weight' {...register("weight", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Pages Quantity' {...register("pages_quantity")} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='Dimensions' {...register("dimensions")} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='isbn' {...register("isbn", { required: true })} />
                <input className="input input-bordered w-full max-w-5xl mb-3" placeholder='binding' {...register("isbn")} />
                <input className="btn btn-primary" type="submit" />
            </form>
        </section>
    );
};

export default AddBooks;