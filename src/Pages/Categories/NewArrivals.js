import { useContext } from "react";
import useNewArrivals from "../../Hooks/useNewArrivalsAndBestSelling";
import { NEW_ARRIVAL_CONTEXT } from "../../Context/NewArrivalBooks";
import ReactSlider from "react-slider";
import styled from "styled-components";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import BookDetailsCard from "../../components/BookDetailsCard";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

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

const NewArrivals = () => {
  const { newArrivals, count } = useNewArrivals();
  const { size, page, setPage, setSliderValue, sliderValue, setSize } =
    useContext(NEW_ARRIVAL_CONTEXT);
  const pages = Math.ceil(count / size);

  // slider
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  // select
  const handleSelectChange = (event) => {
    setSize(parseInt(event.target.value));
    setPage(0);
  };

  let loading;
  if (newArrivals.length === 0) {
    loading = <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-down" data-aos-duration="1000">
      <h2 className="text-center text-3xl my-6 second-font">New Arrivals</h2>
      <PageTitle title="New Arrivals" />

      {/* price range  */}
      <div className="w-full mr-2 mb-6">
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

      {/* show  */}
      <div className="flex justify-end my-6">
        <div className="flex items-center">
          <p className="mr-2">Show: </p>
          <select
            onChange={handleSelectChange}
            className="select select-bordered w-[75px]"
          >
            <option value="3" selected>
              3
            </option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>

      {loading}
      {/* new arrivals  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newArrivals.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>

      {/* pagination */}
      <div className="text-center my-5">
        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={`${
              page === number ? "btn btn-warning" : "btn"
            } my-2 mx-2`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <DynamicLinkButton to="/">
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back To Home
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default NewArrivals;
