import React from 'react';
import Carousel from '../Carousel/Carousel';
import NewArrivals from '../NewArrivals/NewArrivals';

const Home = () => {
    return (
        <section>
            <Carousel></Carousel>
            <div>
                <h1>This is Home</h1>
                <NewArrivals></NewArrivals>
            </div>
        </section>
    );
};

export default Home;