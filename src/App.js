import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import Footer from "./Pages/Shared/Footer";
import Navbar from "./Pages/Shared/Navbar";
import SignIn from "./Pages/SignIn/SignIn";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignIn/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import MyOrders from "./Pages/Dashboard/MyOrders/MyOrders";
import Orders from "./Pages/Dashboard/Orders/Orders";
import MyProfile from "./Pages/Dashboard/MyProfile/MyProfile";
import Users from "./Pages/Dashboard/Users/Users";
import ManageBooks from "./Pages/Dashboard/ManageBooks/ManageBooks";
import Search from "./Pages/Search";
import Blogs from "./Pages/Blogs";
import Welcome from "./Pages/Dashboard/Welcome/Welcome";
import Essays from "./Pages/Categories/TopCategories/Essays/Essays";
import Fiction from "./Pages/Categories/TopCategories/Fiction/Fiction";
import NonFiction from "./Pages/Categories/TopCategories/NonFiction/NonFiction";
import SciFiFantasyAndHorror from "./Pages/Categories/TopCategories/SciFiFantasyAndHorror/SciFiFantasyAndHorror";
import ArtsAndMusic from "./Pages/Categories/MoreCategories/ArtsAndMusic/ArtsAndMusic";
import MysteryAndCrime from "./Pages/Categories/MoreCategories/MysteryAndCrime/MysteryAndCrime";
import Poetry from "./Pages/Categories/MoreCategories/Poetry/Poetry";
import RareBooks from "./Pages/Categories/MoreCategories/RareBooks/RareBooks";
import TopRated from "./Pages/Categories/TopRated/TopRated";
import NewArrivals from "./Pages/Categories/NewArrivals/NewArrivals";
import AllBooks from "./Pages/Categories/AllBooks/AllBooks";
import AddBooks from "./Pages/Dashboard/AddBooks";
import UpdateBook from "./Pages/Dashboard/ManageBooks/UpdateBook";
import NotFound from "./Pages/NotFound";
import RequireAdmin from "./Pages/SignIn/RequireAdmin";
import RequireAuth from "./Pages/SignIn/RequireAuth";
import RequireUser from "./Pages/SignIn/RequireUser";
import Checkout from "./Pages/Checkout/Checkout";
import BookDetails from "./Pages/BookDetails/BookDetails";
import DeliveryDetails from "./Pages/DeliveryDetails/DeliveryDetails";
import AddReview from "./Pages/BookDetails/AddReview/AddReview";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/artsAndMusic" element={<ArtsAndMusic />}></Route>
        <Route path="/essays" element={<Essays />}></Route>
        <Route path="/fiction" element={<Fiction />}></Route>
        <Route path="/mysteryAndCrime" element={<MysteryAndCrime />}></Route>
        <Route path="/nonFiction" element={<NonFiction />}></Route>
        <Route path="/poetry" element={<Poetry />}></Route>
        <Route path="rareBooks" element={<RareBooks />}></Route>
        <Route
          path="/sciFiFantasyAndHorror"
          element={<SciFiFantasyAndHorror />}
        ></Route>
        <Route path="allBooks" element={<AllBooks />}></Route>

        <Route path="/newArrivals" element={<NewArrivals />}></Route>
        <Route path="/topRated" element={<TopRated />}></Route>

        <Route path="/bookDetails/:id" element={<BookDetails />}></Route>
        <Route
          path="/addReview/:id"
          element={
            <RequireAuth>
              <RequireUser>
                <AddReview />
              </RequireUser>
            </RequireAuth>
          }
        ></Route>

        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/deliveryDetails"
          element={
            <RequireAuth>
              <DeliveryDetails />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
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
          <Route path="myProfile" element={<MyProfile />}></Route>
          <Route
            path="myOrders"
            element={
              <RequireUser>
                <MyOrders />
              </RequireUser>
            }
          ></Route>
          <Route
            path="orders"
            element={
              <RequireAdmin>
                <Orders />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="addBooks"
            element={
              <RequireAdmin>
                <AddBooks />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="users"
            element={
              <RequireAdmin>
                <Users />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manageBooks"
            element={
              <RequireAdmin>
                <ManageBooks />
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route
          path="/updateBook/:id"
          element={
            <RequireAdmin>
              <UpdateBook />
            </RequireAdmin>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
