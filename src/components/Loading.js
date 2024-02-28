import { ClimbingBoxLoader } from "react-spinners";
import { css } from "@emotion/react";

const Loading = () => {
  const override = css`
        display: "block",
        margin: "0 auto",
        borderColor: "#36d7b7"`;

  return (
    <div className="h-screen flex justify-center items-center z-50">
      <ClimbingBoxLoader color="#36d7b7" cssOverride={override} size={50} />
    </div>
  );
};

export default Loading;
