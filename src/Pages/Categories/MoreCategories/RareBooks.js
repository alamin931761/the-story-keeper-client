import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import PageTitle from "../../../components/PageTitle";
import BookDetailsCard from "../../../components/BookDetailsCard";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";
import { useGetAllBooksQuery } from "../../../redux/api/bookApi";
import { useDispatch, useSelector } from "react-redux";
import { bookCount } from "../../../redux/features/paginationAndFilterSlice";
import FilterBooks from "../../../components/FilterBooks";

const RareBooks = () => {
  const dispatch = useDispatch();
  const { sort, limit, page, maximumValue, minimumValue } = useSelector(
    (state) => state.paginationAndFilter
  );
  const { data, isLoading } = useGetAllBooksQuery({
    fields: "imageURL,title,author,price",
    category: "rare-books",
    sort: sort,
    limit: limit,
    page: page,
    maximumValue: maximumValue,
    minimumValue: minimumValue,
  });

  if (isLoading) {
    return <Loading />;
  }

  dispatch(bookCount(data.data.data.count));

  return (
    <div className="common-style" data-aos="fade-down" data-aos-duration="1000">
      <PageTitle title="Rare Books" />
      <h2 className="text-center text-3xl my second-font mt-5">Rare Books</h2>

      {/* <FilterCategory /> */}
      <FilterBooks />

      {/* rare books  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.data.fieldQuery.map((data) => (
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
