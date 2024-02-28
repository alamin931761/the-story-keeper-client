import { useEffect } from "react";
import "./AddReview.css";
import { useState } from "react";
import { StarPicker } from "react-star-picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import auth from "../../../firebase.init";
import PageTitle from "../../../components/PageTitle";
import Form from "../../../components/reusableForm/Form";
import FormSection from "../../../components/reusableForm/FormSection";
import Input from "../../../components/reusableForm/Input";
import Textarea from "../../../components/reusableForm/Textarea";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReviewSchema } from "../../../components/reusableForm/Validation";
import DynamicLinkButton from "../../../components/DynamicLinkButton";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate("");
  const [rating, setRating] = useState(null);
  const [bookDetails, setBookDetails] = useState({});
  const {
    image,
    title,
    subtitle,
    author,
    price,
    description,
    publisher,
    publication_date,
    weight,
    pages_quantity,
    dimensions,
    isbn,
    binding,
  } = bookDetails;
  const { id } = useParams();

  // load book details
  useEffect(() => {
    fetch(`https://the-story-keeper-server-ebon.vercel.app/book/${id}`)
      .then((res) => {
        if (res.status === 404) {
          navigate("404");
        }
        return res.json();
      })
      .then((data) => setBookDetails(data));
  }, [id, bookDetails, navigate]);

  // ratings
  const onChange = (value) => {
    setRating(value);
  };

  // date
  const today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August ",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(addReviewSchema) });
  const onSubmit = async (data) => {
    const review = {
      rating: rating,
      review: data.review,
      name: user?.displayName,
      email: user?.email,
      today: `${date} ${month} ${year}`,
    };

    // reviews
    let reviews = [];
    if (bookDetails.reviews) {
      reviews = [...bookDetails.reviews, review];
    } else {
      reviews = [review];
    }
    bookDetails.reviews = reviews;

    // save review to the database
    fetch(`https://the-story-keeper-server-ebon.vercel.app/book/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        image,
        title,
        subtitle,
        author,
        price,
        description,
        publisher,
        publication_date,
        weight,
        pages_quantity,
        dimensions,
        isbn,
        binding,
        reviews,
      }),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/sign-in");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.info("Review submitted successfully");
          setTimeout(() => {
            navigate(`/bookDetails/${id}`);
          }, 5000);
        } else {
          toast.error("Review was not successfully submitted");
        }
      });
    reset();
  };

  return (
    <div className="common-style" data-aos="fade-left" data-aos-duration="1000">
      <PageTitle title="Add Review" />
      <h2 className="text-3xl text-center my-6 second-font">Leave a Review</h2>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-lg">
          <div className="my-5 mx-3 flex flex-col items-center">
            <p className="w-full max-w-lg text-sm">Ratings</p>
            <div className="w-full max-w-lg">
              <StarPicker
                onChange={onChange}
                value={rating}
                halfStars={true}
                doubleTapResets={true}
                numberStars={5}
                size={54}
                className="enlargeStar"
              />
            </div>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
              <Input
                name="bookName"
                label="book name"
                errors={errors}
                type="text"
                value={bookDetails.title}
                disabled={true}
              />
              <Textarea
                name="review"
                errors={errors}
                register={register("review")}
                label="Review content"
              />
            </FormSection>
            <FormSubmit disabled={rating === null}>Submit</FormSubmit>
          </Form>
        </div>
      </div>

      <div className="flex justify-center ">
        <DynamicLinkButton to={`/bookDetails/${id}`}>
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back to Details page
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default AddReview;
