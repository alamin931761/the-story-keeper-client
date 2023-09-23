import React from 'react';
import useAllBooks from '../../../../Hooks/useAllBooks';
import Loading from '../../../Shared/Loading';
import PageTitle from '../../../Shared/PageTitle';
import Card from '../../../Shared/Card';
import BackToHomeButton from '../../../Shared/BackToHomeButton';

const NonFiction = () => {
    const { allBooks } = useAllBooks();
    const nonFiction = allBooks.filter(book => book.category === "non-fiction");
    if (nonFiction.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title='Non-Fiction'></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Non-Fiction</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    nonFiction.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            {/* back button  */}
            <BackToHomeButton />
        </div>
    );
};

export default NonFiction;