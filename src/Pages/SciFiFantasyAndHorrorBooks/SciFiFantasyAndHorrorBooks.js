import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import SciFiFantasyAndHorrorBook from './SciFiFantasyAndHorrorBook/SciFiFantasyAndHorrorBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const SciFiFantasyAndHorrorBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const SciFiFantasyAndHorrorBooks = allBooks.filter(book => book.category === "sci-fi-fantasy-and-horror");
    if (SciFiFantasyAndHorrorBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title="Sci-Fi, Fantasy & Horror"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Sci-Fi, Fantasy & Horror</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    SciFiFantasyAndHorrorBooks.map(data => <SciFiFantasyAndHorrorBook key={data._id} data={data}></SciFiFantasyAndHorrorBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default SciFiFantasyAndHorrorBooks;