import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Carousel from './Carousel/Carousel';
import NewArrivals from './NewArrivals/NewArrivals';
import Services from './Services/Services';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import TopRatedSliceBooks from './TopRatedSliceBooks/TopRatedSliceBooks';

const Home = () => {
    return (
        <div className='border-5 border-red-400 pt-[59px]'>
            <PageTitle title="Home"></PageTitle>
            <Carousel></Carousel>
            <div className='home-page'>
                <NewArrivals></NewArrivals>
                <TopRatedSliceBooks></TopRatedSliceBooks>
                <Services></Services>
                <FrequentlyAskedQuestions></FrequentlyAskedQuestions>
            </div>
        </div>
    );
};

export default Home;