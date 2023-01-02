import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Table = ({ data, deleteBook }) => {
    const { image, name, name2, author, price, description, description2, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding, _id } = data;

    // delete 
    const handleDeleteButton = (id) => {
        deleteBook(id);
    }

    // quantity 
    const [quantity, setQuantity] = useState(1);
    const subTotal = quantity * price;

    const increase = () => {
        setQuantity(quantity + 1);
    };
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.error("Sorry! Less Number of Quantity");
        }
    };

    const bookData = {
        image: image,
        name: name,
        name2: name2,
        author: author,
        price: price,
        description: description,
        description2: description2,
        publisher: publisher,
        publication_date: publication_date,
        weight: weight,
        pages_quantity: pages_quantity,
        dimensions: dimensions,
        isbn: isbn,
        binding: binding,
        quantity: quantity,
        subTotal: subTotal
    };
    // console.log(bookData)

    return (
        <tr>
            <th>
                <button onClick={() => handleDeleteButton(_id)} className="btn btn-circle btn-outline btn-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{author}</div>
                    </div>
                </div>
            </td>
            <td>${price}</td>
            <td>
                <div className='flex items-center'>
                    <button onClick={() => decrease()} className='btn btn-outline rounded-none h-[10px]'>-</button>
                    <input type="text" value={quantity} placeholder="Quantity" className="rounded-none input w-[100px] h-[48px] text-center" />
                    <button onClick={() => increase()} className='btn btn-outline rounded-none h-[10px]'>+</button>
                </div>
            </td>
            <td>${subTotal}</td>
            <ToastContainer />
        </tr>
    );
};

export default Table;