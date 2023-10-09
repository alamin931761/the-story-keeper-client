import React, { useContext, useEffect } from 'react';
import Loading from '../../../Shared/Loading';
import PageTitle from '../../../Shared/PageTitle';
import Card from '../../../Shared/Card';
import BackToHomeButton from '../../../Shared/BackToHomeButton';
import Pagination from '../../../Shared/Pagination';
import FilterCategory from '../../../Shared/FilterCategory';
import { PAGINATION_AND_FILTER_CONTEXT } from '../../../../Context/PaginationAndFilter';
import useAllCategories from '../../../../Hooks/useAllCategories';

const MysteryAndCrime = () => {
    const { setCategory } = useContext(PAGINATION_AND_FILTER_CONTEXT);
    const { books } = useAllCategories();

    useEffect(() => {
        setCategory('mystery-and-crime');
    }, [setCategory])

    let loading;
    if (books.length === 0) {
        loading = <Loading></Loading>;
    };

    return (
        <div className='common-style' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title="Mystery & Crime"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Mystery & Crime</h2>
            <FilterCategory />

            {loading}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    books.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            <Pagination />

            {/* back button  */}
            <BackToHomeButton />
        </div >
    );
};

export default MysteryAndCrime;