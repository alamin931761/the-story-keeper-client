import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Bestsellings from './Bestsellings/Bestsellings';
import Carousel from './Carousel/Carousel';
import NewArrivals from './NewArrivals/NewArrivals';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
    return (
        <section>
            <PageTitle title="Home"></PageTitle>
            {/* <Carousel></Carousel> */}
            <div>
                <h1>This is Home</h1>
                <NewArrivals></NewArrivals>
                <Bestsellings></Bestsellings>
                <Testimonials></Testimonials>
            </div>
        </section>
    );
};

export default Home;