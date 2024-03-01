import { useContext } from "react";
import { PAGINATION_AND_FILTER_CONTEXT } from "../Context/PaginationAndFilter";

const Pagination = () => {
  const { setPage, page, count, size } = useContext(
    PAGINATION_AND_FILTER_CONTEXT
  );
  const pages = Math.ceil(count / size);

  return (
    <div className="text-center my-5">
      {[...Array(pages).keys()].map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`${page === number ? "btn btn-warning" : "btn"} my-2 mx-2`}
        >
          {number + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
