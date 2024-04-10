import { MdKeyboardBackspace } from "react-icons/md";
import BookDetailsCard from "./BookDetailsCard";
import DynamicLinkButton from "./DynamicLinkButton";
import FilterBooks from "./FilterBooks";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import Pagination from "./dataManipulation/Pagination";
import Container from "./Container";

const BooksCardContainer = ({ isLoading, books, count, name, dataAos }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="mx-2" data-aos={dataAos} data-aos-duration="1000">
        <PageTitle title={name} />

        <h2 className="text-center text-3xl my-5 second-font">
          {name} ({count})
        </h2>

        <FilterBooks />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </Container>
  );
};

export default BooksCardContainer;
