import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import PageTitle from "../../components/PageTitle";
import Form from "../../components/reusableForm/Form";
import FormSection from "../../components/reusableForm/FormSection";
import Input from "../../components/reusableForm/Input";
import Textarea from "../../components/reusableForm/Textarea";
import { Select } from "../../components/reusableForm/Select";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAndUpdateBookSchema } from "../../components/reusableForm/Validation";

const AddBooks = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(AddAndUpdateBookSchema) });

  const AddBooks = (data) => {
    const newBook = {
      imageURL: data.imageURL,
      title: data.title,
      subtitle: data.subtitle,
      author: data.author,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      description: data.description,
      publisher: data.publisher,
      publicationDate: new Date(data.publicationDate).toISOString(),
      weight: parseInt(data.weight),
      pagesQuantity: parseInt(data.pagesQuantity),
      dimensions: data.dimensions,
      isbn: parseInt(data.isbn),
      binding: data.binding,
      category: data.category,
      totalSales: 0,
    };

    fetch("https://the-story-keeper-server-ebon.vercel.app/allBooks", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.info("Book added successfully");
        }
      });
    reset();
  };

  return (
    <div data-aos="fade-right" data-aos-duration="1000">
      <PageTitle title="Add Books" />
      <h2 className="text-center text-3xl my-6 second-font">Add Books</h2>

      <Form onSubmit={handleSubmit(AddBooks)} double={true}>
        <FormSection>
          <Input
            register={register("imageURL")}
            type="text"
            name="imageURL"
            label="Image URL"
            errors={errors}
          />
          <Input
            register={register("title")}
            type="text"
            name="title"
            label="title"
            errors={errors}
          />

          <Input
            register={register("subtitle")}
            type="text"
            name="subtitle"
            label="subtitle"
            errors={errors}
          />

          <Input
            register={register("author")}
            type="text"
            name="author"
            label="author"
            errors={errors}
          />

          <Input
            register={register("price")}
            type="text"
            name="price"
            label="price"
            errors={errors}
          />

          <Input
            register={register("quantity")}
            type="text"
            name="quantity"
            label="quantity"
            errors={errors}
          />

          <div className="md:row-span-2">
            <Textarea
              register={register("description")}
              type="text"
              name="description"
              label="description"
              errors={errors}
            />
          </div>

          <Input
            register={register("publisher")}
            type="text"
            name="publisher"
            label="publisher"
            errors={errors}
          />

          <Input
            register={register("publicationDate")}
            type="date"
            name="publicationDate"
            label="publication date"
            errors={errors}
          />

          <Input
            register={register("weight")}
            type="text"
            name="weight"
            label="weight"
            errors={errors}
          />

          <Input
            register={register("pagesQuantity")}
            type="text"
            name="pagesQuantity"
            label="pages Quantity"
            errors={errors}
          />

          <Input
            register={register("dimensions")}
            type="text"
            name="dimensions"
            label="dimensions"
            errors={errors}
          />

          <Input
            register={register("isbn")}
            type="text"
            name="isbn"
            label="isbn"
            errors={errors}
          />

          <Input
            register={register("binding")}
            type="text"
            name="binding"
            label="binding"
            errors={errors}
          />

          <Select
            register={register("category")}
            name="category"
            label="category"
            errors={errors}
          />
        </FormSection>
        <FormSubmit className="md:col-start-2 flex md:justify-end">
          Add Book
        </FormSubmit>
      </Form>
    </div>
  );
};

export default AddBooks;
