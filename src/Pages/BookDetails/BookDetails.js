import { useParams } from "react-router-dom";
import RandomBooks from "./RandomBooks";
import Loading from "../../components/Loading";
import useShoppingCart from "../../Hooks/useShoppingCart";
import PageTitle from "../../components/PageTitle";
import { addToStorage } from "../../utils/saveShoppingCartData";
import { useGetSingleBookQuery } from "../../redux/api/bookApi";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import Reviews from "../Review/Reviews";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  const {
    _id,
    imageURL,
    title,
    subtitle,
    author,
    price,
    availableQuantity,
    description,
    publisher,
    publicationDate,
    pagesQuantity,
    dimensions,
    isbn,
    binding,
    totalSales,
    weight,
    category,
  } = data?.data?.data;

  const date = new Date(publicationDate).toLocaleDateString();

  //   const {
  //     register,
  //     formState: { errors },
  //     handleSubmit,
  //     reset,
  //   } = useForm();
  //   const onSubmit = async (data) => {
  //     // Add book data to local storage
  //     addToStorage(_id, parseInt(data.quantity));
  //     toast.info(`${title} - successfully added to the cart`);
  //     reset();
  //   };

  // set quantity and subtotal values
  //   const { savedCart } = useShoppingCart();
  //   let quantity = 0;
  //   let subtotal = 0;
  //   const findBook = savedCart.find((book) => book._id === _id);
  //   if (findBook) {
  //     quantity = findBook.quantity;
  //     subtotal = findBook.subtotal;
  //   }

  return (
    <div
      className="common-style mb-6"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <PageTitle title="Book Details" />
      <h2 className="text-center text-3xl my-5 second-font capitalize">
        {title} - details
      </h2>

      <div className="flex justify-center">
        <div className="flex flex-wrap lg:flex-nowrap shadow-2xl bg-[#DFF6FF] justify-center">
          <div>
            <img
              className="h-full sm:w-full md:w-full lg:w-[350px]"
              src={imageURL}
              alt={title}
            />
          </div>

          <div className="ml-5 pt-5 mr-5 lg:w-[550px]">
            <h1 className="text-2xl mt-4 second-font capitalize">{title}</h1>
            <h1 className="text-xl mt-4 second-font capitalize">{subtitle}</h1>
            <h3 className="text-lg mt-4 second-font uppercase">{author}</h3>
            <h1 className="text-2xl mt-4 second-font">${price}</h1>
            <hr className="mt-4" />
            <p className="mt-4">{description}</p>
            <div className="mt-4">
              <p className="uppercase">
                {/* <small>quantity: {quantity}</small> */}
              </p>
              <p className="uppercase">
                {/* <small>subtotal: ${subtotal}</small> */}
              </p>
              <p className="uppercase">
                <small>
                  Total Sales: {totalSales} (
                  {totalSales > 1 ? "pieces" : "piece"})
                </small>
              </p>
              <p className="uppercase">
                <small>publisher: {publisher}</small>
              </p>
              <p className="uppercase">
                <small>publication date (MM/DD/YY): {date}</small>
              </p>
              <p className="uppercase">
                <small>weight: {weight}</small>
              </p>
              <p className="uppercase">
                <small>Pages Quantity: {pagesQuantity}</small>
              </p>
              <p className="uppercase">
                <small>
                  Available Quantity: {availableQuantity} (
                  {availableQuantity > 1 ? "pieces" : "piece"})
                </small>
              </p>
              <p className="uppercase">
                <small>dimensions: {dimensions}</small>
              </p>
              <p className="uppercase">
                <small>isbn: {isbn}</small>
              </p>
              <p className="uppercase">
                <small>binding: {binding}</small>
              </p>
            </div>

            {/* <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-between my-2"
            >
              <div className="form-control w-full max-w-[200px] mb-2">
                <input
                  type="number"
                  className="input input-bordered w-full max-w-lg"
                  placeholder="Quantity"
                  {...register("quantity", {
                    required: {
                      value: true,
                      message: "Quantity field is required",
                    },
                    min: {
                      value: 1,
                      message: "Minimum quantity must be 1",
                    },
                    max: {
                      value: 1000,
                      message: "Quantity must be less than 1001",
                    },
                  })}
                />
                <label className="label">
                  {errors.quantity?.type === "required" && (
                    <span className="label-text-alt text-red-400">
                      {errors.quantity.message}
                    </span>
                  )}
                  {errors.quantity?.type === "min" && (
                    <span className="label-text-alt text-red-400">
                      {errors.quantity.message}
                    </span>
                  )}
                  {errors.quantity?.type === "max" && (
                    <span className="label-text-alt text-red-400">
                      {errors.quantity.message}
                    </span>
                  )}
                </label>
              </div>
              <button
                className="btn btn-outline transition ease-linear duration-500"
                type="submit"
              >
                <BsCartPlus className="text-2xl mr-2" />
                Add To Cart
              </button>
            </form> */}
          </div>
        </div>
      </div>

      <Reviews id={_id} />

      <div className="divider" />

      {/* random books */}
      <div className="mt-12">
        <RandomBooks id={_id} category={category} />
      </div>

      <DynamicLinkButton to={`/${data?.data?.data?.category}`}>
        Back
      </DynamicLinkButton>
    </div>
  );
};

export default BookDetails;
