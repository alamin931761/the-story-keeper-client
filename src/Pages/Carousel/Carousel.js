import React from 'react';
import Coverflow from 'react-coverflow';
import carousel1 from '../../assets/images/carousel/carousel1.png';
import carousel2 from '../../assets/images/carousel/carousel2.png';
import carousel3 from '../../assets/images/carousel/carousel3.png';
import carousel4 from '../../assets/images/carousel/carousel4.png';

const Carousel = () => {
    const fn = function () {
        /* do your action */
    }
    return (
        <section className='z-0'>
            <Coverflow classes={{ background: 'rgb(233, 23, 23)' }}
                displayQuantityOfSide={1}
                infiniteScroll={true}
                navigation={false}
                enableScroll={true}
                clickable={true}
                active={0}
                media={{
                    '@media (max-width: 900px)': {
                        width: '100%',
                        height: '300px'
                    },
                    '@media (min-width: 900px)': {
                        width: '100%',
                        height: '100vh'
                    }
                }}
            >
                <div
                    onClick={() => fn()}
                    onKeyDown={() => fn()}
                    role="menuitem"
                    tabIndex="0"
                >
                    <img
                        src={carousel1}
                        alt='title or description'
                        style={{
                            display: 'block',
                            width: '100%',
                        }}
                    />
                </div>
                <img src={carousel2} alt="" />
                <img src={carousel3} alt="" />
                <img src={carousel4} alt="" />
            </Coverflow>
        </section >
    );
};

export default Carousel;