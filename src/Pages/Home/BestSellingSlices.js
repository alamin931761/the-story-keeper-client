import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const BestSellingSlices = () => {
  return (
    <div className="mt-10" data-aos="fade-down" data-aos-duration="1000">
      <div className="flex justify-between items-center my-6">
        <h2 className="text-3xl second-font">Best Selling</h2>
        <Link
          className="text-2xl second-font underline-offset-2 hover:underline decoration-wavy hover:text-blue-500 transition ease-linear duration-500"
          to="/bestSelling"
        >
          View all
          <BsArrowRight className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default BestSellingSlices;
