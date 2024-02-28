import { AiFillThunderbolt, AiFillLike } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";

const Services = () => {
  return (
    <div
      className="mt-10 flex justify-around flex-wrap bg-[#DFF6FF] rounded-lg"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* quick delivery */}
      <div
        className="flex flex-col items-center my-5"
        data-aos="flip-left"
        data-aos-duration="3000"
      >
        <AiFillThunderbolt className="text-5xl" />
        <h2 className="text-2xl second-font">Quick Delivery</h2>
        <p>100% fast delivery service</p>
      </div>

      {/* secure payment */}
      <div
        className="flex flex-col items-center my-5"
        data-aos="flip-left"
        data-aos-duration="3000"
      >
        <MdOutlineSecurity className="text-5xl" />
        <h2 className="text-2xl second-font">Secure Payment</h2>
        <p>100% safe and secure payment service</p>
      </div>

      {/* Best Quality */}
      <div
        className="flex flex-col items-center my-5"
        data-aos="flip-left"
        data-aos-duration="3000"
      >
        <AiFillLike className="text-5xl" />
        <h2 className="text-2xl second-font">Best Quality</h2>
        <p>100% best quality books</p>
      </div>

      {/* Return Guarantee */}
      <div
        className="flex flex-col items-center my-5"
        data-aos="flip-left"
        data-aos-duration="3000"
      >
        <GiRoundStar className="text-5xl" />
        <h2 className="text-2xl second-font">Return Guarantee</h2>
        <p>Within 14 days return</p>
      </div>
    </div>
  );
};

export default Services;
