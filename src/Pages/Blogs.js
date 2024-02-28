import Typewriter from "typewriter-effect";
import BackToHomeButton from "./Shared/BackToHomeButton";
import PageTitle from "../components/PageTitle";

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

      <BackToHomeButton />
    </div>
  );
};

export default Blogs;
