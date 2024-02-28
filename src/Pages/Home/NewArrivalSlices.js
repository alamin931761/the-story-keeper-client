import { BsArrowRight } from "react-icons/bs";
import useNewArrivals from "../../Hooks/useNewArrivalsAndBestSelling";
import Loading from "../../components/Loading";
import BookDetailsCard from "../../components/BookDetailsCard";
import DynamicLink from "../../components/DynamicLink";

const NewArrivalSlices = () => {
  const { newArrivals } = useNewArrivals();
  const newBooksSlices = newArrivals.slice(0, 3);

  let loading;
  if (newBooksSlices.length === 0) {
    loading = <Loading />;
  }

  return (
    <div className="mt-10" data-aos="fade-up" data-aos-duration="1000">
      <div className="flex justify-between items-center my-6">
        <h2 className="text-3xl second-font">New Arrivals</h2>

        <DynamicLink
          to="/newArrivals"
          className="text-2xl underline-offset-2 hover:underline decoration-wavy hover:text-blue-500 transition ease-linear duration-500"
        >
          View all <BsArrowRight className="inline" />
        </DynamicLink>
      </div>
      {loading}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newBooksSlices.map((data) => (
          <BookDetailsCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalSlices;
