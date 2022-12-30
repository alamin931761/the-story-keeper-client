import React, { useContext } from 'react';
import { BookDetailsContext } from '../../App';
import Table from './Table/Table';

const Cart = () => {
    const [bookData, setBookData] = useContext(BookDetailsContext);
    console.log(bookData);

    return (
        <section className='pt-32'>
            <h1 className='text-5xl text-center'>Cart Page</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookData.map(data => <Table key={data._id} data={data}></Table>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Cart;