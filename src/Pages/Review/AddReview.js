import { MdKeyboardBackspace } from "react-icons/md";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import Textarea from "../../components/reusableForm/Textarea";
import Input from "../../components/reusableForm/Input";
import FormSection from "../../components/reusableForm/FormSection";
import PageTitle from "../../components/PageTitle";
import { useState } from "react";
import Rating from "../../components/Rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReviewSchema } from "../../components/reusableForm/Validation";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Form from "../../components/reusableForm/Form";
import { useForm } from "react-hook-form";
import { useAddReviewMutation } from "../../redux/api/reviewApi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../../redux/api/bookApi";
import Container from "../../components/Container";
import UnauthorizedError from "../../components/UnauthorizedError";

const AddReview = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [user] = useAuthState(auth);
  const [ratingValue, setRatingValue] = useState(null);
  const [addReview, { isLoading: ReviewLoading, error, isError }] =
    useAddReviewMutation();

  // rating
  const onChange = (value) => {
    setRatingValue(value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(addReviewSchema) });

  const onSubmit = async (data) => {
    const review = {
      email: user?.email,
      rating: ratingValue,
      reviewContent: data.reviewContent,
    };
    const options = {
      id,
      review,
      token: localStorage.getItem("accessToken"),
    };
    const result = await addReview(options);
    if (result?.data?.success) {
      toast.info(result?.data?.message);
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
    reset();
  };

  if (isLoading || ReviewLoading) {
    return <Loading />;
  }

  const { _id, title } = data?.data?.data;

  return (
    <Container>
      <div
        className="min-h-screen"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <PageTitle title="Add Review" />
        {isError ? (
          <UnauthorizedError error={error} />
        ) : (
          <>
            {" "}
            <h2 className="text-3xl text-center my-5 second-font">
              Leave a Review
            </h2>
            <div className="flex justify-center w-full">
              <div className="w-full max-w-lg">
                <div className="mx-3 flex flex-col items-center">
                  <p className="w-full max-w-lg text-sm">Ratings</p>
                  <div className="w-full max-w-lg">
                    <Rating onChange={onChange} ratingValue={ratingValue} />
                  </div>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormSection>
                    <Input
                      name="bookName"
                      label="book name"
                      errors={errors}
                      type="text"
                      value={title}
                      disabled={true}
                    />
                    <Textarea
                      name="reviewContent"
                      errors={errors}
                      register={register("reviewContent")}
                      label="Review content"
                    />

                    {error ? (
                      <p className="text-red-500">
                        <span className="font-semibold">Error:</span>{" "}
                        {error?.data?.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </FormSection>
                  <FormSubmit disabled={ratingValue === null}>
                    Submit
                  </FormSubmit>
                </Form>
              </div>
            </div>
            <div className="flex justify-center ">
              <DynamicLinkButton to={`/book-details/${_id}`}>
                <MdKeyboardBackspace className="text-2xl mr-2" />
                Back to Details page
              </DynamicLinkButton>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default AddReview;
