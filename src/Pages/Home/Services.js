import { AiFillThunderbolt, AiFillLike } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";
import Service from "../../components/Service";

const Services = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl text-center second-font mb-5">Services</h2>
      <div
        className="flex justify-around flex-wrap bg-[#DFF6FF] rounded-lg"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* quick delivery */}
        <Service>
          <AiFillThunderbolt className="text-5xl" />
          <h2 className="text-2xl second-font">Quick Delivery</h2>
          <p>100% fast delivery service</p>
        </Service>

        {/* secure payment */}
        <Service>
          <MdOutlineSecurity className="text-5xl" />
          <h2 className="text-2xl second-font">Secure Payment</h2>
          <p>100% safe and secure payment service</p>
        </Service>

        {/* Best Quality */}
        <Service>
          <AiFillLike className="text-5xl" />
          <h2 className="text-2xl second-font">Best Quality</h2>
          <p>100% best quality books</p>
        </Service>

        {/* Return Guarantee */}
        <Service>
          <GiRoundStar className="text-5xl" />
          <h2 className="text-2xl second-font">Return Guarantee</h2>
          <p>Within 14 days return</p>
        </Service>
      </div>
    </div>
  );
};

export default Services;
