import React from 'react';

const Table = ({ data, deleteBook }) => {
    const { image, name, author, price, _id, quantity, subtotal } = data;

    // delete 
    const handleDeleteButton = (id) => {
        deleteBook(id);
    }

    return (
        <>
            <tr>
                <th>
                    <label htmlFor="cart-delete-confirm-modal" className="btn btn-circle btn-outline btn-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </label>
                </th>
                <td>
                    <div className="flex itemscart-delete-confirm-modal-center space-x-3">
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
                <td className='text-center'>${price}</td>
                <td className='text-center'>{quantity}</td>
                <td className='text-center'>${subtotal}</td>
            </tr>

            <div>
                <input type="checkbox" id="cart-delete-confirm-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="text-lg text-red-500">Are you sure you want to delete <span className='font-bold'>{name}</span>?</h3>
                        <div className="modal-action">
                            <button onClick={() => handleDeleteButton(_id)} className="btn btn-error">Delete</button>
                            <label htmlFor="cart-delete-confirm-modal" className="btn">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;