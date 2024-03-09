import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import styled from "styled-components";
import {
  booksLimit,
  booksSort,
  maximumSliderValue,
  minimumSliderValue,
  pageNumber,
} from "../redux/features/paginationAndFilterSlice";

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
  border: 1px solid #2f353f;
  color: black;
  border-radius: 15px;
  cursor: grab;
`;
const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);
const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#ddd" : props.index === 1 ? "#2F353F" : "#ddd"};
  border-radius: 999px;
`;
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const FilterBooks = () => {
  // price range
  const dispatch = useDispatch();
  const { minimumValue, maximumValue } = useSelector(
    (state) => state.paginationAndFilter
  );
  const sliderValue = [minimumValue, maximumValue];

  const handleSliderChange = (value) => {
    dispatch(minimumSliderValue(value[0]));
    dispatch(maximumSliderValue(value[1]));
  };

  // select
  const handleSelectChange = (event) => {
    dispatch(booksLimit(parseInt(event.target.value)));
    dispatch(pageNumber(1));
  };

  // sort
  const sortedBooks = (event) => {
    dispatch(booksSort(event.target.value));
  };

  return (
    <div className="my-5">
      {/* price range  */}
      <div className="w-full mr-2 mb-5">
        <div className="flex flex-col justify-center h-full">
          <p className="second-font mb-2">Price Range</p>
          <StyledSlider
            defaultValue={sliderValue}
            renderTrack={Track}
            renderThumb={Thumb}
            onChange={handleSliderChange}
            max={2000}
            min={0}
          />
        </div>
      </div>

      <div className="second-font flex justify-end items-center flex-wrap">
        {/* show  */}
        <div className="flex items-center">
          <p className="mr-2">Show: </p>
          <select
            onChange={handleSelectChange}
            className="select select-bordered w-[75px]"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
          </select>
        </div>

        {/* sort  */}
        <div className="flex items-center ml-10">
          <p className="mr-2 whitespace-nowrap">Sort By:</p>
          <select
            onChange={sortedBooks}
            className="select select-bordered w-[185px]"
          >
            <option value="updatedAt">Default</option>
            <option value="price">Price (Low - High)</option>
            <option value="-price">Price (High - Low)</option>
            <option value="title">Title (A - Z)</option>
            <option value="-title">Title (Z - A)</option>
            <option value="-createdAt">Newest - Oldest</option>
            <option value="createdAt">Oldest - Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBooks;
