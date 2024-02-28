import { useNavigate } from "react-router-dom";

const BookDetailsCard = ({ data }) => {
  const { title, author, price, image, _id } = data;
  const navigate = useNavigate();
  const navigateToDetails = (id) => {
    navigate(`/bookDetails/${id}`);
  };

  return (
    <div
      className="flex justify-center"
      data-aos="flip-left"
      data-aos-duration="3000"
    >
      <div className="card w-[450px] bg-[#DFF6FF] shadow-xl">
        <figure>
          <img className="h-[450px] w-[450px]" src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold second-font">{title}</h2>
          <p className="text-lg">{author}</p>
          <h2 className="text-2xl font-bold">${price}</h2>
          <div className="card-actions justify-end">
            <button
              onClick={() => navigateToDetails(_id)}
              className="btn btn-outline transition ease-linear duration-500"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
