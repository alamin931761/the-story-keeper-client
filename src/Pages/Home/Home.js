import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Bestsellings from './Bestsellings/Bestsellings';
import Carousel from './Carousel/Carousel';
import NewArrivals from './NewArrivals/NewArrivals';

const Home = () => {
    return (
        <section>
            <PageTitle title="Home"></PageTitle>
            <Carousel></Carousel>
            <div>
                <h1>This is Home</h1>
                <NewArrivals></NewArrivals>
                <Bestsellings></Bestsellings>
            </div>
        </section>
    );
};

export default Home;