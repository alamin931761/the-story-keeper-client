import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Carousel from './Carousel/Carousel';
import Services from './Services/Services';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import NewArrivalSlices from './NewArrivalSlices/NewArrivalSlices';
import TopRatedSlices from './TopRatedSlices/TopRatedSlices';

const Home = () => {
    return (
        <div className='border-5 border-red-400 pt-[59px]'>
            <PageTitle title="Home"></PageTitle>
            <Carousel></Carousel>
            <div className='home-page'>
                <NewArrivalSlices />
                <TopRatedSlices />
                <Services />
                <FrequentlyAskedQuestions />
            </div>
        </div>
    );
};

export default Home;