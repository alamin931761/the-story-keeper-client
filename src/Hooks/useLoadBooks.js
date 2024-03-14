import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  documentsCount,
  documentsLimit,
  documentsSort,
  maximumSliderValue,
  minimumSliderValue,
  pageNumber,
} from "../redux/features/paginationAndFilterSlice";
import { useGetAllBooksQuery } from "../redux/api/bookApi";

const useLoadBooks = (fields, category) => {
  const dispatch = useDispatch();

  // set initial query parameters
  useEffect(() => {
    dispatch(documentsSort("availableQuantity"));
    dispatch(documentsLimit(3));
    dispatch(pageNumber(1));
    dispatch(minimumSliderValue(0));
    dispatch(maximumSliderValue(2000));
  }, [dispatch]);

  // query parameters from redux
  const { sort, limit, page, maximumValue, minimumValue } = useSelector(
    (state) => state.paginationAndFilter
  );

  const queryOptions = {
    sort: sort,
    limit: limit,
    page: page,
    maximumValue: maximumValue,
    minimumValue: minimumValue,
  };
  if (fields) {
    queryOptions.fields = fields;
  }
  if (category) {
    queryOptions.category = category;
  }

  const { data, isLoading } = useGetAllBooksQuery(queryOptions);

  //   set count value
  useEffect(() => {
    if (data?.data?.data?.count) {
      dispatch(documentsCount(data?.data?.data?.count));
    }
  }, [data?.data?.data?.count, dispatch]);

  const books = data?.data?.data?.fieldQuery;
  const count = data?.data?.data?.count;

  return { isLoading, books, count };
};

export default useLoadBooks;
