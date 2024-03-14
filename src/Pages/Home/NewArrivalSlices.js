// import { BsArrowRight } from "react-icons/bs";
// import Loading from "../../components/Loading";
// import BookDetailsCard from "../../components/BookDetailsCard";
// import DynamicLink from "../../components/DynamicLink";
// import useLoadBooks from "../../Hooks/useLoadBooks";

// const NewArrivalSlices = () => {
//   const { books, isLoading } = useLoadBooks(
//     "imageURL,title,author,price,createdAt"
//   );
//   const newBooksSlices = books.slice(0, 3);
//   console.log(newBooksSlices);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="mt-10" data-aos="fade-up" data-aos-duration="1000">
//       <div className="flex justify-between items-center my-6">
//         <h2 className="text-3xl">New Arrivals</h2>
//         <DynamicLink to="/new-arrivals">
//           View all <BsArrowRight className="inline" />
//         </DynamicLink>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {newBooksSlices.map((data) => (
//           <BookDetailsCard key={data._id} data={data} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewArrivalSlices;
