import React, { useContext } from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';
import { PAGINATION_AND_FILTER_CONTEXT } from '../../Context/PaginationAndFilter';

// slider 
const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
`;
const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 50px;
    text-align: center;
    background-color: yellow;
    border: 1px solid #2F353F;
    color: black;
    border-radius: 15px;
    cursor: grab;
`;
const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#ddd' : props.index === 1 ? '#2F353F' : '#ddd')};
    border-radius: 999px;
`;
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const FilterCategory = () => {
    const { setSize, setPage, setSliderValue, sliderValue, setSorted } = useContext(PAGINATION_AND_FILTER_CONTEXT);

    // select 
    const handleSelectChange = event => {
        setSize(parseInt(event.target.value));
        setPage(0);
    };

    // slider 
    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    // sort
    const sortedBooks = (event) => {
        if (event.target.value === 'low-high') {
            setSorted(event.target.value);
        } else if (event.target.value === 'high-low') {
            setSorted(event.target.value);
        } else if (event.target.value === 'a-z') {
            setSorted(event.target.value);
        } else if (event.target.value === 'z-a') {
            setSorted(event.target.value);
        } else if (event.target.value === 'oldest-newest') {
            setSorted(event.target.value);
        } else if (event.target.value === 'newest-oldest') {
            setSorted(event.target.value);
        } else if (event.target.value === 'best-selling') {
            setSorted(event.target.value);
        } else {
            setSorted(event.target.value);
        }
    };

    return (
        <div className='mb-6'>
            {/* price range  */}
            <div className='w-full mr-2'>
                <div className='flex flex-col justify-center h-full'>
                    <p className='second-font mb-2'>Price Range</p>
                    <StyledSlider defaultValue={sliderValue} renderTrack={Track} renderThumb={Thumb} onChange={handleSliderChange} max={2000} min={0} />
                </div>
            </div>

            <div className='second-font flex justify-end items-center flex-wrap'>
                {/* show  */}
                <div className='flex items-center my-6'>
                    <p className='mr-2'>Show: </p>
                    <select onChange={handleSelectChange} className="select select-bordered w-[75px]">
                        <option value="3" selected>3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="15">15</option>
                    </select>
                </div>

                {/* sort  */}
                <div className='flex items-center ml-10'>
                    <p className='mr-2 whitespace-nowrap'>Sort By:</p>
                    <select onChange={sortedBooks} className="select select-bordered w-[185px]">
                        <option value="default">Default</option>
                        <option value="low-high">Price (Low - High)</option>
                        <option value="high-low">Price (High - Low)</option>
                        <option value="a-z">Title (A - Z)</option>
                        <option value="z-a">Title (Z - A)</option>
                        <option value="newest-oldest">Newest - Oldest</option>
                        <option value="oldest-newest">Oldest - Newest</option>
                        <option value="best-selling">Best Selling</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterCategory;