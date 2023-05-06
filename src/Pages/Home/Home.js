import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Carousel from './Carousel/Carousel';
import NewArrivals from './NewArrivals/NewArrivals';
import Testimonials from './Testimonials/Testimonials';
import Services from './Services/Services';
import BestSelling from './BestSelling/BestSelling';

const Home = () => {
    return (
        <section>
            <PageTitle title="Home"></PageTitle>
            <Carousel></Carousel>
            <div>
                <NewArrivals></NewArrivals>
                <BestSelling></BestSelling>
                <Services></Services>
                <Testimonials></Testimonials>
            </div>
        </section>
    );
};

export default Home;