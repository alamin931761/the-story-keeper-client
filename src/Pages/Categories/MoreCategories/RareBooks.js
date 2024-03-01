import { useContext, useEffect } from "react";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import FilterCategory from "../../Shared/FilterCategory";
import useAllCategories from "../../../Hooks/useAllCategories";
import { PAGINATION_AND_FILTER_CONTEXT } from "../../../Context/PaginationAndFilter";
import PageTitle from "../../../components/PageTitle";
import BookDetailsCard from "../../../components/BookDetailsCard";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

const RareBooks = () => {
  const { setCategory } = useContext(PAGINATION_AND_FILTER_CONTEXT);
  const { books } = useAllCategories();

  useEffect(() => {
    setCategory("rare-books");
  }, [setCategory]);

  let loading;
  if (books.length === 0) {
    loading = <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-down" data-aos-duration="1000">
      <PageTitle title="Rare Books" />
      <h2 className="text-center text-3xl my-6 second-font">Rare Books</h2>

      <FilterCategory />

      {/* rare books  */}
      {loading}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>

      <Pagination />

      <div className="flex justify-center">
        <DynamicLinkButton to="/">
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back To Home
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default RareBooks;
