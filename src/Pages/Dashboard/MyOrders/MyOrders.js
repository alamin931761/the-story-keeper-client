import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import MyOrder from './MyOrder/MyOrder';
import PageTitle from '../../Shared/PageTitle';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [myOrders, setMyOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/order?email=${user.email}`, {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    // console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem("accessToken");
                        navigate('/');
                    }
                    return res.json()
                })
                .then(data => {
                    setMyOrders(data)
                })
        }
    }, [user]);

    return (
        <section>
            <PageTitle title="My Orders"></PageTitle>
            <h2>My Orders ({myOrders?.length})</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Address</th>
                            <th className='text-center'>Phone Number</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Time</th>
                            <th className='text-center'>Books</th>
                            <th className='text-center'>Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map(data => <MyOrder key={data._id} data={data}></MyOrder>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Orders;