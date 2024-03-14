import useTopRatedBooks from "../../Hooks/useTopRatedBooks";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import BookDetailsCard from "../../components/BookDetailsCard";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

const TopRated = () => {
  const [topRatedBooksArray] = useTopRatedBooks();

  let loading;
  if (topRatedBooksArray.length === 0) {
    loading = <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Top Rated" />
      <h2 className="text-center text-3xl my-5 second-font">Top Rated</h2>
      {loading}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRatedBooksArray.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <DynamicLinkButton to="/">
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back To Home
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default TopRated;
