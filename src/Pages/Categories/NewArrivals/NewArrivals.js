import React from 'react';
import useNewArrivals from '../../../Hooks/useNewArrivals';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';
import Card from '../../Shared/Card';
import BackToHomeButton from '../../Shared/BackToHomeButton';

const NewArrivals = () => {
    const [newBooks] = useNewArrivals([]);
    if (newBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title='New Arrivals'></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>New Arrivals</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    newBooks.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            {/* back button  */}
            <BackToHomeButton />
        </div>
    );
};

export default NewArrivals;