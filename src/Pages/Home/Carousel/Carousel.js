import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

import carousel1 from '../../../assets/images/carousel/carousel1.png';
import carousel2 from '../../../assets/images/carousel/carousel2.png';
import carousel3 from '../../../assets/images/carousel/carousel3.png';

const Carousel = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <section>
            <>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='absolute text-white bg-[#0000007d] p-3 rounded-lg'>
                            <p className='text-[2vw]'>Reading is the best for get idea</p>
                            <h2 className='text-[5vw]'>Start Reading</h2>
                        </div>
                        <img src={carousel1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='absolute text-white bg-[#0000007d] p-3 rounded-lg'>
                            <p className='text-[2vw]'>Reading is the best for get idea</p>
                            <h2 className='text-[5vw]'>Keep Reading</h2>
                        </div>
                        <img src={carousel2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='absolute text-white bg-[#0000007d] p-3 rounded-lg'>
                            <p className='text-[2vw]'>Reading books improves general knowledge</p>
                            <h2 className='text-[5vw]'>Keep Reading</h2>
                        </div>
                        <img src={carousel3} alt="" />
                    </SwiperSlide>
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </>
        </section >
    );
};

export default Carousel;