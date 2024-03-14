import { useDispatch } from "react-redux";
import { documentsSort } from "../../redux/features/paginationAndFilterSlice";
import cn from "../../utils/cn";

const Sort = ({ children, className }) => {
  const dispatch = useDispatch();

  const handleSort = (event) => {
    dispatch(documentsSort(event.target.value));
  };

  return (
    <div className="flex items-center mb-5 ml-5">
      <p className="mr-2 whitespace-nowrap">Sort By:</p>
      <select
        onChange={handleSort}
        className={cn("select select-bordered", className)}
      >
        {children}
      </select>
    </div>
  );
};

export default Sort;
