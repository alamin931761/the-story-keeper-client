import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../Shared/PageTitle';
import Loading from '../../Shared/Loading';
import Card from '../../Shared/Card';
import BackToHomeButton from '../../Shared/BackToHomeButton';
import Pagination from '../../Shared/Pagination';
import FilterCategory from '../../Shared/FilterCategory';
import useAllCategories from '../../../Hooks/useAllCategories';
import { PAGINATION_AND_FILTER_CONTEXT } from '../../../Context/PaginationAndFilter';

const AllBooks = () => {
    const { setCategory } = useContext(PAGINATION_AND_FILTER_CONTEXT);
    const { books } = useAllCategories();

    useEffect(() => {
        setCategory('');
    }, [setCategory])

    let loading;
    if (books.length === 0) {
        loading = <Loading></Loading>;
    };

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="All Books"></PageTitle>
            <h2 className="text-center text-3xl my-6 second-font">All Books</h2>

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
        </div>
    );
};

export default AllBooks;