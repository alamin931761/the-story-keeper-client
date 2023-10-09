import React, { useContext, useEffect } from 'react';
import Loading from '../../../Shared/Loading';
import PageTitle from '../../../Shared/PageTitle';
import Card from '../../../Shared/Card';
import BackToHomeButton from '../../../Shared/BackToHomeButton';
import Pagination from '../../../Shared/Pagination';
import FilterCategory from '../../../Shared/FilterCategory';
import useAllCategories from '../../../../Hooks/useAllCategories';
import { PAGINATION_AND_FILTER_CONTEXT } from '../../../../Context/PaginationAndFilter';

const RareBooks = () => {
    const { setCategory } = useContext(PAGINATION_AND_FILTER_CONTEXT);
    const { books } = useAllCategories();

    useEffect(() => {
        setCategory('rare-books');
    }, [setCategory])

    let loading;
    if (books.length === 0) {
        loading = <Loading></Loading>;
    };

    return (
        <div className='common-style' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title="Rare Books"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Rare Books</h2>

            <FilterCategory />

            {/* rare books  */}
            {loading}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    books.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            <Pagination />

            {/* back button  */}
            <BackToHomeButton />
        </div>
    );
};

export default RareBooks;