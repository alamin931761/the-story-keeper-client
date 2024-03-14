import Limit from "./dataManipulation/Limit";
import Slider from "./dataManipulation/Slider";
import Sort from "./dataManipulation/Sort";

const FilterBooks = () => {
  return (
    <div>
      <Slider />
      <div className="second-font flex justify-end items-center flex-wrap">
        <Limit />
        <Sort className="w-[170px]">
          <option value="availableQuantity">Default</option>
          <option value="price">Price (Low - High)</option>
          <option value="-price">Price (High - Low)</option>
          <option value="title">Title (A - Z)</option>
          <option value="-title">Title (Z - A)</option>
          <option value="-createdAt">Newest - Oldest</option>
          <option value="createdAt">Oldest - Newest</option>
        </Sort>
      </div>
    </div>
  );
};

export default FilterBooks;
