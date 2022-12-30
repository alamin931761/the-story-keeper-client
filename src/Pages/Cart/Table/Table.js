import React from 'react';

const Table = ({ data }) => {
    const { image, name, author, price } = data;
    return (
        <tr>
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
            <th>
                <button className="btn btn-primary">Checkout</button>
            </th>
        </tr>
    );
};

export default Table;