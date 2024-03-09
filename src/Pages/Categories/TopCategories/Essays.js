import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import PageTitle from "../../../components/PageTitle";
import BookDetailsCard from "../../../components/BookDetailsCard";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";
import { useGetAllBooksQuery } from "../../../redux/api/bookApi";

const Essays = () => {
  const { data, isLoading } = useGetAllBooksQuery({
    fields: "imageURL,title,price, author",
    category: "essays",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Essays" />
      <h2 className="text-center text-3xl my-6 second-font">Essays</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.data.map((data) => (
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

export default Essays;
