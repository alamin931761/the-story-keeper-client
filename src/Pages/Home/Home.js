import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Carousel from './Carousel/Carousel';
import NewArrivals from './NewArrivals/NewArrivals';
import Testimonials from './Testimonials/Testimonials';
import Services from './Services/Services';
import BestSelling from './BestSelling/BestSelling';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions/FrequentlyAskedQuestions';

const Home = () => {
    return (
        <div className='border-5 border-red-400 pt-[59px]'>
            <PageTitle title="Home"></PageTitle>
            <Carousel></Carousel>
            <div className='home-page'>
                <NewArrivals></NewArrivals>
                <BestSelling></BestSelling>
                <Services></Services>
                <Testimonials></Testimonials>
                <FrequentlyAskedQuestions></FrequentlyAskedQuestions>
            </div>
        </div>
    );
};

export default Home;