import { StarPicker } from "react-star-picker";

const Rating = ({ ratingValue, onChange }) => {
  if (onChange) {
    return (
      <StarPicker
        onChange={onChange}
        value={ratingValue}
        halfStars={true}
        doubleTapResets={true}
        numberStars={5}
        size={54}
        className="enlargeStar"
      />
    );
  } else {
    return (
      <StarPicker
        value={ratingValue}
        halfStars={true}
        numberStars={ratingValue}
        size={35}
        className="enlargeStar"
      />
    );
  }
};

export default Rating;
