import { useParams } from "react-router-dom";
import RandomBooks from "./RandomBooks";
import Loading from "../../components/Loading";
import PageTitle from "../../components/PageTitle";
import { addToStorage } from "../../utils/saveShoppingCartData";
import { useGetSingleBookQuery } from "../../redux/api/bookApi";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import Reviews from "../Review/Reviews";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import { useState } from "react";
import Container from "../../components/Container";
import { MdKeyboardBackspace } from "react-icons/md";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const [quantity, setQuantity] = useState(1);

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

  // quantity
  const handleQuantityInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (parseInt(value) >= 1 && availableQuantity >= parseInt(value)) {
      setQuantity(parseInt(value));
    } else {
      setQuantity(0);
    }

    if (availableQuantity < parseInt(value)) {
      toast.error(
        "Sorry, we don't have enough stock available for this quantity. Please select a lower quantity or check back later."
      );
    }
  };

  const incrementQuantity = (event) => {
    event.preventDefault();
    if (availableQuantity > quantity) {
      setQuantity((prevState) => prevState + 1);
    } else {
      toast.error(
        "Sorry, we don't have enough stock available for this quantity. Please select a lower quantity or check back later."
      );
    }
  };

  const decrementQuantity = (event) => {
    event.preventDefault();
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    } else {
      toast.error("Quantity cannot be less than 1.");
    }
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToStorage(_id, event.target.quantity.value);
    toast.success(
      <p>
        <span className="font-semibold capitalize">{title} </span>has been added
        to your cart.
      </p>
    );
  };

  return (
    <Container>
      <div className="my-5 mx-2" data-aos="fade-right" data-aos-duration="1000">
        <PageTitle title="Book Details" />
        <h2 className="text-center text-3xl mb-5 second-font capitalize">
          {title} - details
        </h2>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 shadow-md bg-[#DFF6FF]">
            <div className="max-w-[450px]">
              <img className="h-fit w-full" src={imageURL} alt={title} />
            </div>

            <div className="max-w-[450px] p-4">
              <h1 className="text-2xl second-font capitalize">{title}</h1>
              <h1 className="text-xl mt-4 second-font capitalize">
                {subtitle}
              </h1>
              <h3 className="text-lg mt-4 second-font uppercase">{author}</h3>
              <h1 className="text-2xl mt-4 second-font">${price}</h1>
              <hr className="mt-4" />
              <p className="mt-4">{description}</p>
              <div className="mt-4">
                <p className="uppercase mt-1">
                  <small>quantity: {quantity}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>subtotal: ${price * quantity}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>
                    Total Sales: {totalSales} (
                    {totalSales > 1 ? "pieces" : "piece"})
                  </small>
                </p>
                <p className="uppercase mt-1">
                  <small>
                    Available Quantity: {availableQuantity} (
                    {availableQuantity > 1 ? "pieces" : "piece"})
                  </small>
                </p>
                <p className="uppercase mt-1">
                  <small>publisher: {publisher}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>publication date (MM/DD/YY): {date}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>weight: {weight}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>Pages Quantity: {pagesQuantity}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>dimensions: {dimensions}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>isbn: {isbn}</small>
                </p>
                <p className="uppercase mt-1">
                  <small>binding: {binding}</small>
                </p>
              </div>

              <form onSubmit={handleAddToCart} className="mt-4">
                <div className="flex justify-between flex-wrap gap-3">
                  <div className="flex">
                    <button
                      onClick={decrementQuantity}
                      className="btn btn-outline transition ease-linear duration-500 rounded-none"
                    >
                      <FaMinus className="text-lg" />
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      onChange={handleQuantityInputChange}
                      value={quantity}
                      className="input input-bordered rounded-none w-32 focus:outline-none text-center text-2xl"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="btn btn-outline transition ease-linear duration-500 rounded-none"
                    >
                      <FaPlus className="text-lg" />
                    </button>
                  </div>

                  <button
                    className="btn btn-outline transition ease-linear duration-500 rounded-none"
                    type="submit"
                    disabled={availableQuantity === 0}
                  >
                    {availableQuantity > 0 ? (
                      <>
                        <BsCartPlus className="text-2xl mr-1" />
                        Add To Cart
                      </>
                    ) : (
                      "Out of stock"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="divider my-5" />
        {/* reviews */}
        <Reviews id={_id} />
        <div className="divider my-5" />

        {/* random books */}
        <RandomBooks id={_id} category={category} />

        <div className="flex justify-center">
          <DynamicLinkButton to={`/${data?.data?.data?.category}`}>
            <MdKeyboardBackspace className="text-2xl mr-2" />
            Back
          </DynamicLinkButton>
        </div>
      </div>
    </Container>
  );
};

export default BookDetails;
