import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Order from './Order.js/Order';

const Orders = () => {
    const [orders, setOrdres] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then(res => res.json())
            .then(data => setOrdres(data))
    }, [])
    console.log(orders);
    return (
        <section>
            <h1>Orders({orders?.length})</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Address</th>
                            <th className='text-center'>Phone Number</th>
                            <th className='text-center'>Books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(data => <Order key={data._id} data={data}></Order>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Orders;