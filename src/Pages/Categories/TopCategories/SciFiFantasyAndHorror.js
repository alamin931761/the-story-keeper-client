import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import PageTitle from "../../../components/PageTitle";
import BookDetailsCard from "../../../components/BookDetailsCard";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";
import FilterBooks from "../../../components/FilterBooks";
import useLoadBooks from "../../../Hooks/useLoadBooks";

const SciFiFantasyAndHorror = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "sci-fi-fantasy-and-horror"
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-down" data-aos-duration="1000">
      <PageTitle title="Sci-Fi, Fantasy & Horror" />
      <h2 className="text-center text-3xl my-6 second-font">
        Sci-Fi, Fantasy & Horror ({count})
      </h2>

      <FilterBooks />

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

export default SciFiFantasyAndHorror;
