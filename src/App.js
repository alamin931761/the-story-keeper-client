import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignIn/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import Essays from "./Pages/Categories/TopCategories/Essays";
import Fiction from "./Pages/Categories/TopCategories/Fiction";
import NonFiction from "./Pages/Categories/TopCategories/NonFiction";
import SciFiFantasyAndHorror from "./Pages/Categories/TopCategories/SciFiFantasyAndHorror";
import AllBooks from "./Pages/Categories/AllBooks";
import UpdateBook from "./Pages/Dashboard/Books/UpdateBook";
import NotFound from "./Pages/NotFound";
import RequireSuperAdmin from "./Pages/SignIn/RequireSuperAdmin";
import RequireAdmin from "./Pages/SignIn/RequireAdmin";
import RequireAuth from "./Pages/SignIn/RequireAuth";
import RequireUser from "./Pages/SignIn/RequireUser";
import BookDetails from "./Pages/BookDetails/BookDetails";
import ArtsAndMusic from "./Pages/Categories/MoreCategories/ArtsAndMusic";
import MysteryAndCrime from "./Pages/Categories/MoreCategories/MysteryAndCrime";
import Poetry from "./Pages/Categories/MoreCategories/Poetry";
import RareBooks from "./Pages/Categories/MoreCategories/RareBooks";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Welcome from "./Pages/Dashboard/Welcome";
import AddReview from "./Pages/Review/AddReview";
import UpdateReview from "./Pages/Review/UpdateReview";
import Coupons from "./Pages/Dashboard/Coupons/Coupons";
import Books from "./Pages/Dashboard/Books/Books";
import AddBook from "./Pages/Dashboard/Books/AddBook";
import AddCoupon from "./Pages/Dashboard/Coupons/AddCoupon";
import UpdateCoupon from "./Pages/Dashboard/Coupons/UpdateCoupon";
import DeliveryDetails from "./Pages/DeliveryDetails";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Dashboard/Orders/Orders";
import MyOrders from "./Pages/Dashboard/MyOrders/MyOrders";
import Search from "./Pages/Search";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />

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
        <Route
          path="/add-review/:id"
          element={
            <RequireUser>
              <AddReview />
            </RequireUser>
          }
        />
        <Route
          path="/review/:id"
          element={
            <RequireUser>
              <UpdateReview />
            </RequireUser>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route
          path="/delivery-details"
          element={
            <RequireUser>
              <DeliveryDetails />
            </RequireUser>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireUser>
              <Checkout />
            </RequireUser>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Welcome />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route
            path="/dashboard/my-orders"
            element={
              <RequireUser>
                <MyOrders />
              </RequireUser>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <RequireAdmin>
                <Orders />
              </RequireAdmin>
            }
          />

          <Route
            path="/dashboard/books/add-book"
            element={
              <RequireAdmin>
                <AddBook />
              </RequireAdmin>
            }
          />

          <Route
            path="/dashboard/books"
            element={
              <RequireAdmin>
                <Books />
              </RequireAdmin>
            }
          />

          <Route
            path="/dashboard/books/update-book/:id"
            element={
              <RequireAdmin>
                <UpdateBook />
              </RequireAdmin>
            }
          />

          <Route
            path="/dashboard/users"
            element={
              <RequireSuperAdmin>
                <Users />
              </RequireSuperAdmin>
            }
          />

          <Route
            path="/dashboard/coupons/add-coupon"
            element={
              <RequireAdmin>
                <AddCoupon />
              </RequireAdmin>
            }
          />

          <Route
            path="/dashboard/coupons"
            element={
              <RequireAdmin>
                <Coupons />
              </RequireAdmin>
            }
          />

          <Route
            path="/dashboard/coupons/update-coupon/:id"
            element={
              <RequireAdmin>
                <UpdateCoupon />
              </RequireAdmin>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
