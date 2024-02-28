import useTopRatedBooks from "../../../Hooks/useTopRatedBooks";
import Loading from "../../../components/Loading";
import BackToHomeButton from "../../Shared/BackToHomeButton";
import PageTitle from "../../../components/PageTitle";
import BookDetailsCard from "../../../components/BookDetailsCard";

const TopRated = () => {
  const [topRatedBooksArray] = useTopRatedBooks();

  let loading;
  if (topRatedBooksArray.length === 0) {
    loading = <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Top Rated" />
      <h2 className="text-center text-3xl my-6 second-font">Top Rated</h2>
      {loading}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRatedBooksArray.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>

      {/* back button  */}
      <BackToHomeButton />
    </div>
  );
};

export default TopRated;
