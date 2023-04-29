import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import useAllBooks from '../../Hooks/useAllBooks';
import SearchedOut from './SearchedOut/SearchedOut';
import PageTitle from '../Shared/PageTitle';

const Search = () => {
    const [search, setSearch] = useContext(SearchContext);
    const [allBooks, setAllBooks] = useAllBooks([]);
    const searchResult = allBooks.filter(books => books.name.toLowerCase().includes(search));
    console.log(searchResult);

    let result = '';
    if (searchResult.length === 0) {
        result = <h2 className="text-3xl text-center">No Results Found For: <span className='text-red-500'>{search}</span></h2>
    } else {
        result = <h2 className="text-3xl text-center">Search Results For: <span className='text-red-500'>{search}</span></h2>
    }

    return (
        <section className='pt-20'>
            <PageTitle title="Search"></PageTitle>
            <h2 className="text-3xl text-center">{result}</h2>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    searchResult.map(data => <SearchedOut key={data._id} data={data}></SearchedOut>)
                }
            </div>
        </section>
    );
};

export default Search;