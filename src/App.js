import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import Footer from "./Pages/SignIn/layouts/Footer";
import Navbar from "./Pages/SignIn/layouts/Navbar";
import SignIn from "./Pages/SignIn/SignIn";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignIn/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import MyOrders from "./Pages/Dashboard/MyOrders/MyOrders";
// import Orders from "./Pages/Dashboard/Orders/Orders";
import Users from "./Pages/Dashboard/Users/Users";
import ManageBooks from "./Pages/Dashboard/ManageBooks/ManageBooks";
// import Search from "./Pages/Search";
import Blogs from "./Pages/Blogs";
import Essays from "./Pages/Categories/TopCategories/Essays";
import Fiction from "./Pages/Categories/TopCategories/Fiction";
import NonFiction from "./Pages/Categories/TopCategories/NonFiction";
import SciFiFantasyAndHorror from "./Pages/Categories/TopCategories/SciFiFantasyAndHorror";
// import TopRated from "./Pages/Categories/TopRated";
import NewArrivals from "./Pages/Categories/NewArrivals";
import AllBooks from "./Pages/Categories/AllBooks";
import AddBooks from "./Pages/Dashboard/AddBooks";
import UpdateBook from "./Pages/Dashboard/ManageBooks/UpdateBook";
import NotFound from "./Pages/NotFound";
import RequireAdmin from "./Pages/SignIn/RequireAdmin";
import RequireAuth from "./Pages/SignIn/RequireAuth";
import RequireUser from "./Pages/SignIn/RequireUser";
import BookDetails from "./Pages/BookDetails/BookDetails";
// import Checkout from "./Pages/Checkout/Checkout";
// import AddReview from "./Pages/BookDetails/AddReview/AddReview";
import ArtsAndMusic from "./Pages/Categories/MoreCategories/ArtsAndMusic";
import MysteryAndCrime from "./Pages/Categories/MoreCategories/MysteryAndCrime";
import Poetry from "./Pages/Categories/MoreCategories/Poetry";
import RareBooks from "./Pages/Categories/MoreCategories/RareBooks";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Welcome from "./Pages/Dashboard/Welcome";
// import DeliveryDetails from "./Pages/DeliveryDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        {/* <Route path="/search" element={<Search />}></Route> */}
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/essays" element={<Essays />} />
        <Route path="/fiction" element={<Fiction />} />
        <Route path="/non-fiction" element={<NonFiction />} />
        <Route
          path="/sci-fi-fantasy-and-horror"
          element={<SciFiFantasyAndHorror />}
        />
        <Route path="/arts-and-music" element={<ArtsAndMusic />} />
        <Route path="/mystery-and-crime" element={<MysteryAndCrime />} />
        <Route path="/poetry" element={<Poetry />} />
        <Route path="/rare-books" element={<RareBooks />} />
        <Route path="/all-books" element={<AllBooks />} />

        <Route path="/book-details/:id" element={<BookDetails />} />
        {/* <Route path="/new-arrivals" element={<NewArrivals />} /> */}
        {/* 
        <Route path="/topRated" element={<TopRated />}></Route>

        */}
        <Route
          path="/addReview/:id"
          element={
            <RequireAuth>
              {/* <RequireUser><AddReview /></RequireUser> */}
            </RequireAuth>
          }
        ></Route>

        {/* <Route path="/cart" element={<Cart />}></Route> */}
        <Route
          path="/deliveryDetails"
          // element={<RequireAuth>{/* <DeliveryDetails /> */}</RequireAuth>}
        ></Route>
        <Route
          path="/checkout"
          // element={<RequireAuth>{/* <Checkout /> */}</RequireAuth>}
        ></Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Welcome />}></Route>
          <Route path="my-profile" element={<MyProfile />} />
          <Route
            path="myOrders"
            // element={<RequireUser>{/* <MyOrders /> */}</RequireUser>}
          ></Route>
          <Route
            path="orders"
            // element={<RequireAdmin>{/* <Orders /> */}</RequireAdmin>}
          ></Route>
          <Route
            path="add-book"
            element={
              // <RequireAdmin>
              <AddBooks />
              // </RequireAdmin>
            }
          ></Route>
          <Route
            path="users"
            // element={<RequireAdmin>{/* <Users /> */}</RequireAdmin>}
            element={<Users />}
          ></Route>
          <Route
            path="manageBooks"
            // element={<RequireAdmin>{/* <ManageBooks /> */}</RequireAdmin>}
            element={<ManageBooks />}
          ></Route>
        </Route>
        <Route
          path="/update-book/:id"
          // element={<RequireAdmin>{/* <UpdateBook /> */}</RequireAdmin>}
          element={<UpdateBook />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
