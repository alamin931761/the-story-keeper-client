import Typewriter from "typewriter-effect";
import PageTitle from "../components/PageTitle";
import DynamicLinkButton from "../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

const Blogs = () => {
  return (
    <div className="common-style" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Blogs" />
      <div className="text-4xl second-font flex justify-center mt-4">
        <Typewriter
          options={{
            strings: ["Coming Soon"],
            autoStart: true,
            loop: true,
            delay: 100,
          }}
        />
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

export default Blogs;
