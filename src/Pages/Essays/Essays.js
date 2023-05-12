import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Essay from './Essay/Essay';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const Essays = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const essays = allBooks.filter(book => book.category === "essays");
    if (essays.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title='Essays'></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Essays'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    essays.map(data => <Essay key={data._id} data={data}></Essay>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-primary mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default Essays;