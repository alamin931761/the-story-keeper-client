import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import ArtsAndMusicBook from './ArtsAndMusicBook/ArtsAndMusicBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import Typewriter from 'typewriter-effect';

const ArtsAndMusicBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const artsAndMusicBooks = allBooks.filter(book => book.category === "arts-and-music");
    if (artsAndMusicBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title="Arts & Music"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Arts & Music'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    artsAndMusicBooks.map(data => <ArtsAndMusicBook key={data._id} data={data}></ArtsAndMusicBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-outline mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default ArtsAndMusicBooks;