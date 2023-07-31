import React from 'react';
import Essay from './Essay/Essay';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import useAllBooks from '../../../Hooks/useAllBooks';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';

const Essays = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const essays = allBooks.filter(book => book.category === "essays");
    if (essays.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title='Essays'></PageTitle>
            <h2 className='text-center text-3xl my-6'>Essays</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    essays.map(data => <Essay key={data._id} data={data}></Essay>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default Essays;