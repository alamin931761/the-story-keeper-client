import Loading from "../../components/Loading";
import BookDetailsCard from "../../components/BookDetailsCard";
import { useGetRandomBooksQuery } from "../../redux/api/bookApi";

const RandomBooks = ({ id, category }) => {
  const bookCategory = { category: category };

  const { data, isLoading } = useGetRandomBooksQuery({
    id,
    bookCategory,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-center text-3xl second-font">You may also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {data?.data?.data?.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default RandomBooks;
