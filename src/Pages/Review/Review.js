import { useNavigate } from "react-router-dom";
import useTimeDifferenceDisplay from "../../Hooks/useTimeDifferenceDisplay";
import Rating from "../../components/Rating";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useGetSingleUserQuery } from "../../redux/api/userApi";
import { useGetSingleReviewQuery } from "../../redux/api/reviewApi";

const Review = ({ data, setDeleteState }) => {
  const { createdAt, rating, reviewContent, _id } = data;
  const timeDifference = useTimeDifferenceDisplay(createdAt);
  const [user] = useAuthState(auth);
  const { data: userData } = useGetSingleUserQuery({
    email: user?.email,
  });
  const { data: getSingleReviewData } = useGetSingleReviewQuery({
    id: _id,
  });

  const navigate = useNavigate("");
  const handleUpdateReview = (id) => {
    navigate(`/review/${id}`);
  };

  // image
  let imageURL = "https://i.ibb.co/4WCwkWc/user-default-image.png";
  if (data?.user?.imageURL) {
    imageURL = data?.user?.imageURL;
  }

  return (
    <div
      className="p-3 shadow-sm bg-[#DFF6FF] rounded w-96"
      data-aos="flip-left"
      data-aos-duration="3000"
    >
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="avatar">
            <div className="w-12 mask rounded-full">
              <img src={imageURL} alt={data?.user?.name} />
            </div>
          </div>

          <div className="ml-1">
            <h6>{data.user.name}</h6>
            <p className="text-xs">{timeDifference}</p>
          </div>
        </div>

        {userData?.data?.data?.role === "user" &&
        getSingleReviewData?.data?.data?.user?.email === user?.email ? (
          <div className="flex">
            <BiEdit
              onClick={() => handleUpdateReview(_id)}
              className="text-4xl hover:cursor-pointer hover:text-blue-500 transition-all duration-500 hover:rotate-6"
            />

            <label
              onClick={() => setDeleteState(data)}
              htmlFor="review-delete-confirmation-modal"
              className="text-4xl hover:cursor-pointer hover:text-red-500 transition-all duration-500 hover:rotate-6"
            >
              <MdDelete className="text-4xl" />
            </label>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="divider my-0" />

      <div>
        <Rating ratingValue={rating} />
        <p className="mt-1">{reviewContent}</p>
      </div>
    </div>
  );
};

export default Review;
