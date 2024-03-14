import { useDispatch } from "react-redux";
import {
  documentsLimit,
  pageNumber,
} from "../../redux/features/paginationAndFilterSlice";

const Limit = () => {
  const dispatch = useDispatch();
  // select
  const handleLimitChange = (event) => {
    dispatch(documentsLimit(parseInt(event.target.value)));
    dispatch(pageNumber(1));
  };

  return (
    <div className="flex items-center mb-5">
      <p className="mr-2">Show: </p>
      <select
        onChange={handleLimitChange}
        className="select select-bordered w-[75px]"
      >
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

export default Limit;
