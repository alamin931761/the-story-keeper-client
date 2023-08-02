import React from 'react';
import Loading from '../../Shared/Loading';
import Order from './Order.js/Order';
import PageTitle from '../../Shared/PageTitle';
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { Navigate } from 'react-router-dom';
import { GoBook } from 'react-icons/go';

const Orders = () => {
    // orders data load using React query
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('http://localhost:5000/orders', {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            Navigate('/');
        }
        return res.json()
    }));
    if (isLoading) {
        return <Loading></Loading>
    }

    let orderContainer;
    if (orders.length > 0) {
        orderContainer = <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Address</th>
                        <th className='text-center'>Phone Number</th>
                        <th className='text-center'>Date</th>
                        <th className='text-center'>Time</th>
                        <th className='text-center'>Books</th>
                        <th className='text-center'>Total</th>
                        <th className='text-center'>Transaction Id</th>
                        <th className='text-center'>Delivery</th>
                        <th className='text-center'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((data, index) => <Order key={data._id} data={data} refetch={refetch} index={index}></Order>)
                    }
                </tbody>
            </table>
        </div>
    } else {
        orderContainer = <div className='w-full mt-6 flex flex-col items-center justify-center'>
            <GoBook className='text-7xl opacity-5' />
            <p>No one has ordered yet</p>
        </div>
    }

    return (
        <div data-aos="fade-right" data-aos-duration="1000">
            <PageTitle title="Orders"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Orders({orders?.length})</h2>

            {orderContainer}
        </div>
    );
};

export default Orders;