import Carousel from "./Carousel/Carousel";
import PageTitle from "../../components/PageTitle";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import Services from "./Services";
// import NewArrivalSlices from "./NewArrivalSlices";

const Home = () => {
  return (
    <div className="border-5 border-red-400 pt-[59px]">
      <PageTitle title="Home" />
      <Carousel />
      <div className="home-page">
        {/* <NewArrivalSlices /> */}
        {/* <TopRatedSlices /> */}
        <Services />
        <FrequentlyAskedQuestions />
      </div>
    </div>
  );
};

export default Home;
