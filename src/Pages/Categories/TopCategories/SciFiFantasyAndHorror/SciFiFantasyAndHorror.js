import React from 'react';
import useAllBooks from '../../../../Hooks/useAllBooks';
import Loading from '../../../Shared/Loading';
import PageTitle from '../../../Shared/PageTitle';
import Card from '../../../Shared/Card';
import BackToHomeButton from '../../../Shared/BackToHomeButton';

const SciFiFantasyAndHorror = () => {
    const { allBooks } = useAllBooks();
    const SciFiFantasyAndHorror = allBooks.filter(book => book.category === "sci-fi-fantasy-and-horror");
    if (SciFiFantasyAndHorror.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title="Sci-Fi, Fantasy & Horror"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Sci-Fi, Fantasy & Horror</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    SciFiFantasyAndHorror.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>

            {/* back button  */}
            <BackToHomeButton />
        </div>
    );
};

export default SciFiFantasyAndHorror;