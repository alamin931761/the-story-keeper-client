// import { signOut } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import auth from "../../../firebase.init";
// import { GoBook } from "react-icons/go";
// import PageTitle from "../../../components/PageTitle";
// import MyOrder from "./MyOrder";

// const MyOrders = () => {
//   const [user] = useAuthState(auth);
//   const [myOrders, setMyOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       fetch(`http://localhost:5000/api/v1//order?email=${user.email}`, {
//         method: "GET",
//         headers: {
//           authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       })
//         .then((res) => {
//           if (res.status === 401 || res.status === 403) {
//             signOut(auth);
//             localStorage.removeItem("accessToken");
//             navigate("/");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setMyOrders(data);
//         });
//     }
//   }, [user, navigate]);

//   let myOrdersContainer;
//   if (myOrders.length > 0) {
//     myOrdersContainer = (
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
//             </tr>
//           </thead>
//           <tbody>
//             {myOrders.map((data, index) => (
//               <MyOrder key={data._id} data={data} index={index} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   } else {
//     myOrdersContainer = (
//       <div className="w-full mt-5 flex flex-col items-center justify-center">
//         <GoBook className="text-7xl opacity-5" />
//         <p className="second-font mx-2">
//           There are no orders associated with this account that were placed in
//           the past
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div data-aos="fade-right" data-aos-duration="1000">
//       <PageTitle title="My Orders" />
//       <h2 className="text-center text-3xl my-5 second-font">
//         My Orders ({myOrders?.length})
//       </h2>

//       {myOrdersContainer}
//     </div>
//   );
// };

// export default MyOrders;
