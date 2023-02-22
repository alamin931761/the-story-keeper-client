import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Order from './Order/Order';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/order?email=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data))
        }
    }, [user]);
    return (
        <section>
            <h2>Your Orders ({orders?.length})</h2>
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