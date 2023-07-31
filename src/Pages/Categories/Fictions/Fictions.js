import React from 'react';
import Fiction from './Fiction/Fiction';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import useAllBooks from '../../../Hooks/useAllBooks';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';

const Fictions = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const fictions = allBooks.filter(book => book.category === "fiction");
    if (fictions.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title='Fiction'></PageTitle>
            <h2 className='text-center text-3xl my-6'>Fiction</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    fictions.map(data => <Fiction key={data._id} data={data}></Fiction>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default Fictions;