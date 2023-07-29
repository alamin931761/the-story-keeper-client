import React from 'react';
import { MdDelete } from 'react-icons/md';
import { ImCross } from 'react-icons/im';

const Table = ({ data, deleteBook, index }) => {
    const { image, title, author, price, _id, quantity, subtotal } = data;

    // delete 
    const handleDeleteButton = (id) => {
        deleteBook(id);
    }

    return (
        <>
            <tr>
                <th className='text-center'>{index + 1}</th>
                <th>
                    <label htmlFor="cart-delete-confirm-modal" className="btn btn-circle btn-outline btn-error">
                        < MdDelete className='text-3xl' />
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
                            <div className="font-bold">{title}</div>
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
                        <h3 className="text-lg text-red-500">Are you sure you want to delete <span className='font-bold'>{title}</span>?</h3>
                        <div className="modal-action">
                            <button onClick={() => handleDeleteButton(_id)} className="btn btn-outline btn-error mb-1">< MdDelete className='text-2xl mr-2' />Delete</button>
                            <label htmlFor="cart-delete-confirm-modal" className="btn btn-outline"><ImCross className='text-xl mr-2 mb-1' />Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;