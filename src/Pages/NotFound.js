import { MdKeyboardBackspace } from "react-icons/md";
import notFound from "../assets/images/not-found.png";
import PageTitle from "../components/PageTitle";
import DynamicLinkButton from "../components/DynamicLinkButton";
import Container from "../components/Container";

const NotFound = () => {
  return (
    <Container className="mt-5">
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="404" />
        <div>
          <img src={notFound} alt="Page Not Found" />
        </div>

        <div className="flex flex-col items-center mt-10">
          <p className="text-xl mb-5">
            We're sorry the page you requested could not be found.
          </p>
          <p className="text-lg mb-5">Please go back to the homepage</p>

          <DynamicLinkButton to="/">
            <MdKeyboardBackspace className="text-2xl mr-2" />
            Back To Home
          </DynamicLinkButton>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
