import Carousel from "./Carousel/Carousel";
import PageTitle from "../../components/PageTitle";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import Services from "./Services";
import Container from "../../components/Container";

const Home = () => {
  return (
    <Container>
      <PageTitle title="Home" />
      <Carousel />
      <div className="px-2">
        <Services />
        <FrequentlyAskedQuestions />
      </div>
    </Container>
  );
};

export default Home;
