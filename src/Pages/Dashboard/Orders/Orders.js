// import Loading from "../../../components/Loading";
// import { useQuery } from "react-query";
// import { signOut } from "firebase/auth";
// import auth from "../../../firebase.init";
// import { Navigate } from "react-router-dom";
// import { GoBook } from "react-icons/go";
// import PageTitle from "../../../components/PageTitle";
// import Order from "./Order";

// const Orders = () => {
//   // orders data load using React query
//   const {
//     data: orders,
//     isLoading,
//     refetch,
//   } = useQuery("orders", () =>
//     fetch("http://localhost:5000/api/v1//orders", {
//       method: "GET",
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     }).then((res) => {
//       if (res.status === 401 || res.status === 403) {
//         signOut(auth);
//         localStorage.removeItem("accessToken");
//         Navigate("/");
//       }
//       return res.json();
//     })
//   );
//   let loading;
//   if (isLoading) {
//     loading = <Loading />;
//   }

//   let orderContainer;
//   if (orders?.length > 0) {
//     orderContainer = (
//       <div className="overflow-x-auto w-full">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th></th>
//               <th className="text-center">Name</th>
//               <th className="text-center">Email</th>
//               <th className="text-center">Address</th>
//               <th className="text-center">Phone Number</th>
//               <th className="text-center">Date</th>
//               <th className="text-center">Time</th>
//               <th className="text-center">Books</th>
//               <th className="text-center">Total</th>
//               <th className="text-center">Transaction Id</th>
//               <th className="text-center">Delivery</th>
//               <th className="text-center">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((data, index) => (
//               <Order
//                 key={data._id}
//                 data={data}
//                 refetch={refetch}
//                 index={index}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   } else {
//     orderContainer = (
//       <div className="w-full mt-5 flex flex-col items-center justify-center">
//         <GoBook className="text-7xl opacity-5" />
//         <p className="second-font">No one has ordered yet</p>
//       </div>
//     );
//   }

//   return (
//     <div data-aos="fade-right" data-aos-duration="1000">
//       <PageTitle title="Orders" />
//       <h2 className="text-center text-3xl my-5 second-font">
//         Orders({orders?.length})
//       </h2>
//       {loading}
//       {orderContainer}
//     </div>
//   );
// };

// export default Orders;
