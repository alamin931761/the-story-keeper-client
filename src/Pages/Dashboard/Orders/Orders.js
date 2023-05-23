import React from 'react';
import Loading from '../../Shared/Loading';
import Order from './Order.js/Order';
import PageTitle from '../../Shared/PageTitle';
import { useQuery } from 'react-query';
import Typewriter from 'typewriter-effect';

const Orders = () => {
    // orders data load using React query
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('https://the-story-keeper-server-ten.vercel.app/orders', {
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

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: [`Orders(${orders?.length})`],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>


            <div className="overflow-x-auto w-full">
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
        </section>
    );
};

export default Orders;