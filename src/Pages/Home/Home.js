import Carousel from "./Carousel/Carousel";
import NewArrivalSlices from "./NewArrivalSlices";
import TopRatedSlices from "./TopRatedSlices";
import PageTitle from "../../components/PageTitle";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import Services from "./Services";

const Home = () => {
  return (
    <div className="border-5 border-red-400 pt-[59px]">
      <PageTitle title="Home" />
      <Carousel></Carousel>
      <div className="home-page">
        <NewArrivalSlices />
        <TopRatedSlices />
        <Services />
        <FrequentlyAskedQuestions />
      </div>
    </div>
  );
};

export default Home;
