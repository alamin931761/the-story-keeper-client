import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import styled from "styled-components";
import {
  maximumSliderValue,
  minimumSliderValue,
} from "../../redux/features/paginationAndFilterSlice";

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

const Slider = () => {
  const dispatch = useDispatch();

  const { minimumValue, maximumValue } = useSelector(
    (state) => state.paginationAndFilter
  );

  const sliderValue = [minimumValue, maximumValue];

  const handleSliderChange = (value) => {
    dispatch(minimumSliderValue(value[0]));
    dispatch(maximumSliderValue(value[1]));
  };

  return (
    <div className="w-full mb-5">
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
  );
};

export default Slider;
