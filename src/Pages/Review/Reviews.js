import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
} from "../../redux/api/reviewApi";
import { MdOutlineRateReview } from "react-icons/md";
import Review from "./Review";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { useState } from "react";
import { toast } from "react-toastify";
import UnauthorizedError from "../../components/UnauthorizedError";
import auth from "../../firebase.init";
import { useGetSingleUserQuery } from "../../redux/api/userApi";
import { useAuthState } from "react-firebase-hooks/auth";

const Reviews = ({ id }) => {
  const { data, isLoading } = useGetAllReviewsQuery(id);
  const [deleteBook, { isLoading: deleteReviewLoading, isError, error }] =
    useDeleteReviewMutation();
  const [user] = useAuthState(auth);
  const { data: userData, isUserDataLoading } = useGetSingleUserQuery({
    email: user?.email,
  });
  const [deleteState, setDeleteState] = useState(null);
  const navigate = useNavigate("");

  if (isLoading || deleteReviewLoading || isUserDataLoading) {
    return <Loading />;
  }

  // delete review
  const handleDelete = async (reviewData) => {
    const result = await deleteBook({
      id: reviewData._id,
      token: localStorage.getItem("accessToken"),
    });
    toast.success(result?.data?.message);
    setDeleteState(null);
  };

  // add review
  const navigateToAddReview = () => {
    navigate(`/add-review/${id}`);
  };

  let totalReview = 0;
  let totalRating = 0;
  let averageRating = 0;
  let reviewContainer;
  if (data?.data?.data?.length > 0) {
    totalReview = data.data.data.length;
    const ratings = data.data.data.map((data) => data.rating);
    for (const rating of ratings) {
      totalRating = totalRating + rating;
    }

    averageRating = (totalRating / totalReview).toFixed(1);

    reviewContainer = (
      <div className="flex flex-wrap justify-around gap-y-5 mt-5">
        {data.data.data.map((reviewData) => (
          <Review
            key={reviewData._id}
            data={reviewData}
            setDeleteState={setDeleteState}
          />
        ))}
      </div>
    );
  } else {
    reviewContainer = (
      <div className="flex flex-col items-center justify-center second-font mt-5">
        <MdOutlineRateReview className="text-7xl opacity-5" />
        <p>This book has no reviews yet. Be the first one to write a review.</p>
      </div>
    );
  }

  return (
    <>
      {isError ? (
        <UnauthorizedError error={error} />
      ) : (
        <>
          <h2 className="text-center text-3xl second-font">
            Reviews({data?.data?.data?.length || 0})
          </h2>

          <div className="flex items-center justify-between mt-5">
            <p className="second-font">
              Get specific details about this book from customers who own it.
            </p>
            <button
              onClick={navigateToAddReview}
              className="btn btn-outline transition ease-linear duration-500"
              disabled={userData?.data?.data?.role !== "user"}
            >
              Write a Review
            </button>
          </div>

          <p className="second-font">
            <span className="font-semibold">Ratings:</span> {averageRating} out
            of 5
          </p>

          {reviewContainer}

          <DeleteConfirmationModal
            modalName="review-delete-confirmation-modal"
            message={
              <>
                Are you sure you want to delete this{" "}
                <span className="font-semibold">review</span>
              </>
            }
            deleteState={deleteState}
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  );
};

export default Reviews;
