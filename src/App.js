import { Route, Routes } from 'react-router-dom';
import './App.css';
import { createContext } from 'react';
import { useState } from 'react';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import SignIn from './Pages/SignIn/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './Pages/Contact/Contact';
import SignUp from './Pages/SignIn/SignUp';
import RequireAuth from './Pages/SignIn/RequireAuth/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddBooks from './Pages/Dashboard/AddBooks/AddBooks';
import { ToastContainer } from 'react-toastify';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import Orders from './Pages/Dashboard/Orders/Orders';
import MyProfile from './Pages/Dashboard/MyProfile/MyProfile';
import Users from './Pages/Dashboard/Users/Users';
import RequireAdmin from './Pages/SignIn/RequireAdmin/RequireAdmin';
import ManageBooks from './Pages/Dashboard/ManageBooks/ManageBooks';
import RequireUser from './Pages/SignIn/RequireUser/RequireUser';
import EditBook from './Pages/Dashboard/ManageBooks/EditBook/EditBook';
import Search from './Pages/Search/Search';
import Blogs from './Pages/Blogs/Blogs';
import Welcome from './Pages/Dashboard/Welcome/Welcome';

// top categories 
import Essays from './Pages/Categories/TopCategories/Essays/Essays';
import Fiction from './Pages/Categories/TopCategories/Fiction/Fiction';
import NonFiction from './Pages/Categories/TopCategories/NonFiction/NonFiction';
import SciFiFantasyAndHorror from './Pages/Categories/TopCategories/SciFiFantasyAndHorror/SciFiFantasyAndHorror';

// more categories 
import ArtsAndMusic from './Pages/Categories/MoreCategories/ArtsAndMusic/ArtsAndMusic';
import MysteryAndCrime from './Pages/Categories/MoreCategories/MysteryAndCrime/MysteryAndCrime';
import Poetry from './Pages/Categories/MoreCategories/Poetry/Poetry';
import RareBooks from './Pages/Categories/MoreCategories/RareBooks/RareBooks';

import TopRated from './Pages/Categories/TopRated/TopRated';
import NewArrivals from './Pages/Categories/NewArrivals/NewArrivals';
import AllBooks from './Pages/Categories/AllBooks/AllBooks';

import Checkout from './Pages/Cart/Checkout/Checkout';
import BookDetails from './Pages/Shared/BookDetails/BookDetails';
import AddReview from './Pages/Shared/BookDetails/AddReview/AddReview';
import DeliveryDetails from './Pages/Cart/DeliveryDetails/DeliveryDetails';

export const OrderContext = createContext();
export const SearchContext = createContext();

function App() {
  const [order, setOrder] = useState({});
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <OrderContext.Provider value={[order, setOrder]}>
        <SearchContext.Provider value={[search, setSearch]}>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/signIn' element={<SignIn></SignIn>}></Route>
            <Route path='/signUp' element={<SignUp></SignUp>}></Route>
            <Route path='/search' element={<Search></Search>}></Route>
            <Route path='/blogs' element={<Blogs></Blogs>}></Route>
            <Route path='/contact' element={<Contact></Contact>}></Route>

            <Route path='/artsAndMusic' element={<ArtsAndMusic></ArtsAndMusic>}></Route>
            <Route path='/essays' element={<Essays></Essays>}></Route>
            <Route path='/fiction' element={<Fiction></Fiction>}></Route>
            <Route path='/mysteryAndCrime' element={<MysteryAndCrime></MysteryAndCrime>}></Route>
            <Route path='/nonFiction' element={<NonFiction></NonFiction>}></Route>
            <Route path='/poetry' element={<Poetry></Poetry>}></Route>
            <Route path='rareBooks' element={<RareBooks></RareBooks>}></Route>
            <Route path='/sciFiFantasyAndHorror' element={<SciFiFantasyAndHorror></SciFiFantasyAndHorror>}></Route>
            <Route path='allBooks' element={<AllBooks></AllBooks>}></Route>

            <Route path='/NewArrivals' element={<NewArrivals></NewArrivals>}></Route>
            <Route path='/topRated' element={<TopRated></TopRated>}></Route>

            <Route path='/bookDetails/:id' element={<BookDetails></BookDetails>}></Route>
            <Route path='/addReview/:id' element={<RequireAuth><RequireUser><AddReview></AddReview></RequireUser></RequireAuth>}></Route>


            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/deliveryDetails' element={<RequireAuth><DeliveryDetails /></RequireAuth>}></Route>
            <Route path='/checkout' element={<RequireAuth><Checkout></Checkout></RequireAuth>}></Route>


            <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
              <Route index element={<Welcome></Welcome>}></Route>
              <Route path='myProfile' element={<MyProfile></MyProfile>}></Route>
              <Route path='myOrders' element={<RequireUser><MyOrders></MyOrders></RequireUser>}></Route>
              <Route path='orders' element={<RequireAdmin><Orders></Orders></RequireAdmin>}></Route>
              <Route path='addBooks' element={<RequireAdmin><AddBooks></AddBooks></RequireAdmin>}></Route>
              <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
              <Route path='manageBooks' element={<RequireAdmin><ManageBooks></ManageBooks></RequireAdmin>}></Route>
            </Route>
            <Route path='/editBook/:id' element={<RequireAdmin><EditBook /></RequireAdmin>}></Route>

            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
          <Footer></Footer>
        </SearchContext.Provider>
      </OrderContext.Provider>
      <ToastContainer></ToastContainer>
    </div >
  );
}

export default App;
