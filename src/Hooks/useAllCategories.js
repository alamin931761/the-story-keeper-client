import { useContext, useEffect, useState } from "react";
import { PAGINATION_AND_FILTER_CONTEXT } from "../Context/PaginationAndFilter";

const useAllCategories = () => {
  const [books, setBooks] = useState([]);
  const {
    setCount,
    page,
    size,
    sorted,
    minimumSliderValue,
    maximumSliderValue,
    category,
  } = useContext(PAGINATION_AND_FILTER_CONTEXT);

  useEffect(() => {
    fetch(
      `https://the-story-keeper-server-ebon.vercel.app/books?page=${page}&size=${size}`,
      {
        headers: {
          sorted,
          minimum_slider_value: minimumSliderValue,
          maximum_slider_value: maximumSliderValue,
          category: category,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setBooks(data.books);
      });
  }, [
    page,
    size,
    sorted,
    minimumSliderValue,
    maximumSliderValue,
    setCount,
    category,
    setBooks,
    books,
  ]);

  return { books };
};

export default useAllCategories;
