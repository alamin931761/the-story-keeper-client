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
    const searchByTitle = allBooks.filter(books => books.title.toLowerCase().includes(search));
    const searchByAuthor = allBooks.filter(books => books.author.toLowerCase().includes(search));
    const searchByISBN = allBooks?.filter(books => books.isbn.toString().includes(search));

    let result = '';
    if (searchByTitle.length === 0 && searchByAuthor.length === 0 && searchByISBN.length === 0) {
        result = <h2 className="text-3xl text-center mt-5">No Results Found For: <span className='text-red-500'>{search}</span></h2>
    } else {
        result = <h2 className="text-3xl text-center mt-5 pb-5">Search Results For: <span className='text-red-500'>{search}</span></h2>
    }

    return (
        <div className='common-style'>
            <PageTitle title="Search"></PageTitle>

            {result}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    searchByTitle?.map(data => <SearchedOut key={data._id} data={data}></SearchedOut>)
                }
                {
                    searchByAuthor?.map(data => <SearchedOut key={data._id} data={data}></SearchedOut>)
                }
                {
                    searchByISBN?.map(data => <SearchedOut key={data._id} data={data}></SearchedOut>)
                }
            </div>

            <div className='my-6 flex justify-center'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default Search;