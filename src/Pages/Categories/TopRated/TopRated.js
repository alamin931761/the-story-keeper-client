import React from 'react';
import PageTitle from '../../Shared/PageTitle';
import useTopRatedBooks from '../../../Hooks/useTopRatedBooks';
import Loading from '../../Shared/Loading';
import Card from '../../Shared/Card';
import BackToHomeButton from '../../Shared/BackToHomeButton';

const TopRated = () => {
    const [topRatedBooksArray] = useTopRatedBooks();

    if (topRatedBooksArray.length === 0) {
        return <Loading></Loading>;
    };

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title='Top Rated'></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Top Rated</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    topRatedBooksArray.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            {/* back button  */}
            <BackToHomeButton />
        </div>
    );
};

export default TopRated;