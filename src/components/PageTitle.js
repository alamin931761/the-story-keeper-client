import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} - The Story Keeper</title>
    </Helmet>
  );
};

export default PageTitle;
