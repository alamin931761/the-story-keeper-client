import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import useAllBooks from '../../Hooks/useAllBooks';
import PageTitle from '../Shared/PageTitle';
import Card from '../Shared/Card';
import BackToHomeButton from '../Shared/BackToHomeButton';
import Loading from '../Shared/Loading';

const Search = () => {
    const [search, setSearch] = useContext(SearchContext);
    const { allBooks } = useAllBooks();
    const searchByTitle = allBooks.filter(books => books.title.toLowerCase().includes(search));
    const searchByAuthor = allBooks.filter(books => books.author.toLowerCase().includes(search));
    const searchByISBN = allBooks?.filter(books => books.isbn.toString().includes(search));

    let result = '';
    let loading;
    if (searchByTitle.length === 0 && searchByAuthor.length === 0 && searchByISBN.length === 0) {
        result = <h2 className="text-3xl text-center mt-5 second-font">No Results Found For: <span className='text-red-500'>{search}</span></h2>
        loading = <Loading />
    } else {
        result = <h2 className="text-3xl text-center mt-5 pb-5 second-font">Search Results For: <span className='text-red-500'>{search}</span></h2>
    }

    return (
        <div className='common-style'>
            <PageTitle title="Search"></PageTitle>

            {result}
            {loading}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    searchByTitle?.map(data => <Card key={data._id} data={data}></Card>)
                }
                {
                    searchByAuthor?.map(data => <Card key={data._id} data={data}></Card>)
                }
                {
                    searchByISBN?.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            <BackToHomeButton />
        </div>
    );
};

export default Search;