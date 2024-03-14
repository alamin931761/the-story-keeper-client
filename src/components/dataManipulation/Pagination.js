import { useDispatch, useSelector } from "react-redux";
import { pageNumber } from "../../redux/features/paginationAndFilterSlice";

const Pagination = () => {
  const dispatch = useDispatch();

  const { page, limit, count } = useSelector(
    (state) => state.paginationAndFilter
  );

  const pages = Math.ceil(count / limit);

  return (
    <div className="text-center my-5">
      {[...Array(pages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => dispatch(pageNumber(number + 1))}
          className={`${
            page === number + 1 ? "btn btn-warning" : "btn"
          } my-2 mx-2`}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
