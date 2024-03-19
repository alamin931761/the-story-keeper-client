import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateBookSchema } from "../../../components/reusableForm/Validation";
import { toast } from "react-toastify";
import PageTitle from "../../../components/PageTitle";
import Form from "../../../components/reusableForm/Form";
import FormSection from "../../../components/reusableForm/FormSection";
import Input from "../../../components/reusableForm/Input";
import Textarea from "../../../components/reusableForm/Textarea";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import { Select } from "../../../components/reusableForm/Select";
import { BsArrowLeft } from "react-icons/bs";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../../../redux/api/bookApi";
import Loading from "../../../components/Loading";

const UpdateBook = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleBookQuery(id);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(UpdateBookSchema) });

  if (isLoading || updating) {
    return <Loading />;
  }

  if (error) {
    toast.error(error?.data?.message);
  }

  const {
    author,
    availableQuantity,
    binding,
    category,
    description,
    dimensions,
    imageURL,
    isbn,
    pagesQuantity,
    price,
    publicationDate,
    publisher,
    subtitle,
    title,
    weight,
    _id,
  } = data?.data?.data;
  const date = new Date(publicationDate).toLocaleDateString();

  const handleUpdateBook = async (data) => {
    const book = {
      price: parseInt(data.price),
      availableQuantity: parseInt(data.availableQuantity),
    };

    const options = {
      id: _id,
      data: book,
    };

    const result = await updateBook(options);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }

    reset();
  };

  return (
    <div className="common-style" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Edit Book" />
      <h2 className="text-center text-3xl my-5 second-font">{title}</h2>

      <Form double={true} onSubmit={handleSubmit(handleUpdateBook)}>
        <FormSection>
          <Input
            type="text"
            name="imageURL"
            label="Image URL"
            errors={errors}
            value={imageURL}
            disabled={true}
          />
          <Input
            type="text"
            name="title"
            label="title"
            errors={errors}
            value={title}
            disabled={true}
          />

          <Input
            type="text"
            name="subtitle"
            label="subtitle"
            errors={errors}
            value={subtitle}
            disabled={true}
          />

          <Input
            type="text"
            name="author"
            label="author"
            errors={errors}
            value={author}
            disabled={true}
          />

          <Input
            register={register("price")}
            type="text"
            name="price"
            label="price"
            errors={errors}
          />

          <Input
            register={register("availableQuantity")}
            type="text"
            name="availableQuantity"
            label="Available Quantity"
            errors={errors}
          />

          <div className="md:row-span-2">
            <Textarea
              type="text"
              name="description"
              label="description"
              errors={errors}
              value={description}
              disabled={true}
            />
          </div>

          <Input
            type="text"
            name="publisher"
            label="publisher"
            errors={errors}
            value={publisher}
            disabled={true}
          />

          <Input
            type="date"
            name="publicationDate"
            label="publication date"
            errors={errors}
            value={date}
            disabled={true}
          />

          <Input
            type="text"
            name="weight"
            label="weight"
            errors={errors}
            value={weight}
            disabled={true}
          />

          <Input
            type="text"
            name="pagesQuantity"
            label="pages Quantity"
            errors={errors}
            value={pagesQuantity}
            disabled={true}
          />

          <Input
            type="text"
            name="dimensions"
            label="dimensions"
            errors={errors}
            value={dimensions}
            disabled={true}
          />

          <Input
            type="text"
            name="isbn"
            label="isbn"
            errors={errors}
            value={isbn}
            disabled={true}
          />

          <Input
            type="text"
            name="binding"
            label="binding"
            errors={errors}
            value={binding}
            disabled={true}
          />

          <Select
            name="category"
            label="category"
            errors={errors}
            value={category}
            disabled={true}
          />
        </FormSection>

        <FormSubmit className="md:col-start-2 flex md:justify-end">
          Update Book
        </FormSubmit>
      </Form>

      <div className="flex justify-center mb-5">
        <DynamicLinkButton to="/dashboard/manageBooks">
          <BsArrowLeft className="text-2xl mr-2" />
          Back to Manage Books
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default UpdateBook;
