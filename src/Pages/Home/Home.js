import Carousel from "./Carousel/Carousel";
import PageTitle from "../../components/PageTitle";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import Services from "./Services";
import Container from "../../components/Container";
// import NewArrivalSlices from "./NewArrivalSlices";

const Home = () => {
  return (
    <Container>
      <PageTitle title="Home" />
      <Carousel />
      <div className="px-2">
        {/* <NewArrivalSlices /> */}
        {/* <TopRatedSlices /> */}
        <Services />
        <FrequentlyAskedQuestions />
      </div>
    </Container>
  );
};

export default Home;
