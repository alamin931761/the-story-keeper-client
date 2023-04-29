import React from 'react';
import Loading from '../../Shared/Loading';
import Order from './Order.js/Order';
import PageTitle from '../../Shared/PageTitle';
import { useQuery } from 'react-query';

const Orders = () => {
    // orders data load using React query
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('http://localhost:5000/orders', {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    if (orders.length === undefined) {
        return <Loading></Loading>
    }

    return (
        <section>
            <PageTitle title="Orders"></PageTitle>
            <h1>Orders({orders?.length})</h1>
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
                            <th className='text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(data => <Order key={data._id} data={data} refetch={refetch}></Order>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Orders;