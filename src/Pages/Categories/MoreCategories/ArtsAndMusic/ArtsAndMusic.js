import React from 'react';
import useAllBooks from '../../../../Hooks/useAllBooks';
import Loading from '../../../Shared/Loading';
import PageTitle from '../../../Shared/PageTitle';
import Card from '../../../Shared/Card';
import BackToHomeButton from '../../../Shared/BackToHomeButton';

const ArtsAndMusic = () => {
    const { allBooks } = useAllBooks();
    const artsAndMusic = allBooks.filter(book => book.category === "arts-and-music");
    if (artsAndMusic.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="Arts & Music"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Arts & Music</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    artsAndMusic.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            {/* back button  */}
            <BackToHomeButton />
        </div>
    );
};

export default ArtsAndMusic;