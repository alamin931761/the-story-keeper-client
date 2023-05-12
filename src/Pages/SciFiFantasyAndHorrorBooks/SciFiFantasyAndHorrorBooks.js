import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import SciFiFantasyAndHorrorBook from './SciFiFantasyAndHorrorBook/SciFiFantasyAndHorrorBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import Typewriter from 'typewriter-effect';

const SciFiFantasyAndHorrorBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const SciFiFantasyAndHorrorBooks = allBooks.filter(book => book.category === "sci-fi-fantasy-and-horror");
    if (SciFiFantasyAndHorrorBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title="Sci-Fi, Fantasy & Horror"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Sci-Fi, Fantasy & Horror'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    SciFiFantasyAndHorrorBooks.map(data => <SciFiFantasyAndHorrorBook key={data._id} data={data}></SciFiFantasyAndHorrorBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-primary mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default SciFiFantasyAndHorrorBooks;