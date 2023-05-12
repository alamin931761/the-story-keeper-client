import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import useAllBooks from '../../Hooks/useAllBooks';
import SearchedOut from './SearchedOut/SearchedOut';
import PageTitle from '../Shared/PageTitle';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Search = () => {
    const [search, setSearch] = useContext(SearchContext);
    const [allBooks, setAllBooks] = useAllBooks([]);
    const searchResult = allBooks.filter(books => books.name.toLowerCase().includes(search));

    let result = '';
    if (searchResult.length === 0) {
        result = <h2 className="text-3xl text-center mt-5">No Results Found For: <span className='text-red-500'>{search}</span></h2>
    } else {
        result = <h2 className="text-3xl text-center mt-5 pb-5">Search Results For: <span className='text-red-500'>{search}</span></h2>
    }

    return (
        <section className='common-style'>
            <PageTitle title="Search"></PageTitle>

            <h2 className="text-3xl text-center">{result}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    searchResult.map(data => <SearchedOut key={data._id} data={data}></SearchedOut>)
                }
            </div>

            <div className='mt-10 flex justify-center'>
                <Link className='btn btn-primary mb-5' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default Search;