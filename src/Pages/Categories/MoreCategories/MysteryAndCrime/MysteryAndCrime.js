import { useContext, useEffect } from "react";
import Loading from "../../../../components/Loading";
import BackToHomeButton from "../../../Shared/BackToHomeButton";
import Pagination from "../../../../components/Pagination";
import FilterCategory from "../../../Shared/FilterCategory";
import { PAGINATION_AND_FILTER_CONTEXT } from "../../../../Context/PaginationAndFilter";
import useAllCategories from "../../../../Hooks/useAllCategories";
import PageTitle from "../../../../components/PageTitle";
import BookDetailsCard from "../../../../components/BookDetailsCard";

const MysteryAndCrime = () => {
  const { setCategory } = useContext(PAGINATION_AND_FILTER_CONTEXT);
  const { books } = useAllCategories();

  useEffect(() => {
    setCategory("mystery-and-crime");
  }, [setCategory]);

  let loading;
  if (books.length === 0) {
    loading = <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-down" data-aos-duration="1000">
      <PageTitle title="Mystery & Crime" />
      <h2 className="text-center text-3xl my-6 second-font">Mystery & Crime</h2>
      <FilterCategory />

      {loading}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>

      <Pagination />

      {/* back button  */}
      <BackToHomeButton />
    </div>
  );
};

export default MysteryAndCrime;
