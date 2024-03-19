import React, { useState } from "react";
import {
  useGetSingleReviewQuery,
  useUpdateReviewMutation,
} from "../../redux/api/reviewApi";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateReviewSchema } from "../../components/reusableForm/Validation";
import PageTitle from "../../components/PageTitle";
import Rating from "../../components/Rating";
import Form from "../../components/reusableForm/Form";
import FormSection from "../../components/reusableForm/FormSection";
import Textarea from "../../components/reusableForm/Textarea";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import Loading from "../../components/Loading";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";
import { toast } from "react-toastify";

const UpdateReview = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleReviewQuery(id);
  const [updateReview, { isLoading: updateReviewLoading, error }] =
    useUpdateReviewMutation();
  const [ratingValue, setRatingValue] = useState(null);

  // rating
  const onChange = (value) => {
    setRatingValue(value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(updateReviewSchema) });

  const onSubmit = async (data) => {
    let review = {};
    if (ratingValue) {
      review.rating = ratingValue;
    }
    if (data.reviewContent) {
      review.reviewContent = data.reviewContent;
    }

    const options = {
      id,
      review,
    };
    const result = await updateReview(options);
    if (result?.data?.success) {
      toast.info(result.data.message);
    }

    if (result?.error?.data?.success === false) {
      toast.error(result.error.data.message);
    }
    reset();
  };

  if (updateReviewLoading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="common-style" data-aos="fade-left" data-aos-duration="1000">
      <PageTitle title="Update Review" />
      <h2 className="text-3xl text-center my-5 second-font">Update Review</h2>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-lg">
          <div className="my-5 mx-3 flex flex-col items-center">
            <p className="w-full max-w-lg text-sm">Ratings</p>
            <div className="w-full max-w-lg">
              <Rating onChange={onChange} ratingValue={ratingValue} />
            </div>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
              <Textarea
                name="reviewContent"
                errors={errors}
                register={register("reviewContent")}
                label="Review content"
              />

              {error ? (
                <p className="text-red-500">
                  <span className="font-semibold">Error:</span>{" "}
                  {error.data.message}
                </p>
              ) : (
                ""
              )}
            </FormSection>
            <FormSubmit>Update</FormSubmit>
          </Form>
        </div>
      </div>

      <div className="flex justify-center ">
        <DynamicLinkButton to={`/book-details/${data.data.data.bookId}`}>
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back to Details page
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default UpdateReview;
