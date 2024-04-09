// import { useContext } from "react";
// import useAllBooks from "../Hooks/useAllBooks";
// import Loading from "../components/Loading";
// import { SearchContext } from "../Context/Search";
// import PageTitle from "../components/PageTitle";
// import BookDetailsCard from "../components/BookDetailsCard";
// import DynamicLinkButton from "../components/DynamicLinkButton";
// import { MdKeyboardBackspace } from "react-icons/md";

// const Search = () => {
//   const [search, setSearch] = useContext(SearchContext);
//   const { allBooks } = useAllBooks();
//   const searchByTitle = allBooks.filter((books) =>
//     books.title.toLowerCase().includes(search)
//   );
//   const searchByAuthor = allBooks.filter((books) =>
//     books.author.toLowerCase().includes(search)
//   );
//   const searchByISBN = allBooks?.filter((books) =>
//     books.isbn.toString().includes(search)
//   );

//   let result = "";
//   let loading;
//   if (
//     searchByTitle.length === 0 &&
//     searchByAuthor.length === 0 &&
//     searchByISBN.length === 0
//   ) {
//     result = (
//       <h2 className="text-3xl text-center mt-5 second-font">
//         No Results Found For: <span className="text-red-500">{search}</span>
//       </h2>
//     );
//     loading = <Loading />;
//   } else {
//     result = (
//       <h2 className="text-3xl text-center mt-5 pb-5 second-font">
//         Search Results For: <span className="text-red-500">{search}</span>
//       </h2>
//     );
//   }

//   return (
//     <div className=" ">
//       <PageTitle title="Search" />

//       {result}
//       {loading}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {searchByTitle?.map((data) => (
//           <BookDetailsCard key={data._id} data={data} />
//         ))}
//         {searchByAuthor?.map((data) => (
//           <BookDetailsCard key={data._id} data={data} />
//         ))}
//         {searchByISBN?.map((data) => (
//           <BookDetailsCard key={data._id} data={data} />
//         ))}
//       </div>

//       <div className="flex justify-center">
//         <DynamicLinkButton to="/">
//           <MdKeyboardBackspace className="text-2xl mr-2" />
//           Back To Home
//         </DynamicLinkButton>
//       </div>
//     </div>
//   );
// };

// export default Search;
