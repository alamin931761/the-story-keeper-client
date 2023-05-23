import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Fiction from './Fiction/Fiction';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const Fictions = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const fictions = allBooks.filter(book => book.category === "fiction");
    if (fictions.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title='Fiction'></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Fiction'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    fictions.map(data => <Fiction key={data._id} data={data}></Fiction>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-outline mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default Fictions;