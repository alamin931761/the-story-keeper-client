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
import Details from './Pages/Cart/Details/Details';
import RequireUser from './Pages/SignIn/RequireUser/RequireUser';
import EditBook from './Pages/Dashboard/EditBook/EditBook';
import Search from './Pages/Search/Search';
import Blogs from './Pages/Blogs/Blogs';
import Welcome from './Pages/Dashboard/Welcome/Welcome';
import ArtsAndMusicBooks from './Pages/Categories/ArtAndMusicBooks/ArtsAndMusicBooks';
import BookDetails from './Pages/Categories/BookDetails/BookDetails';
import Essays from './Pages/Categories/Essays/Essays';
import Fictions from './Pages/Categories/Fictions/Fictions';
import MysteryAndCrimeBooks from './Pages/Categories/MysteryAndCrimeBooks/MysteryAndCrimeBooks';
import NewArrivalBooks from './Pages/Categories/NewArrivalBooks/NewArrivalBooks';
import NonFictionBooks from './Pages/Categories/NonFictionBooks/NonFictionBooks';
import PoetryBooks from './Pages/Categories/PoetryBooks/PoetryBooks';
import RareBooks from './Pages/Categories/RareBooks/RareBooks';
import SciFiFantasyAndHorrorBooks from './Pages/Categories/SciFiFantasyAndHorrorBooks/SciFiFantasyAndHorrorBooks';
import Checkout from './Pages/Cart/Checkout/Checkout';
import AllBooks from './Pages/Categories/AllBooks/AllBooks';
import TopRatedBooks from './Pages/Categories/TopRatedBooks/TopRatedBooks';
import AddReview from './Pages/Categories/BookDetails/AddReview/AddReview';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

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


            <Route path='/artsAndMusic' element={<ArtsAndMusicBooks></ArtsAndMusicBooks>}></Route>
            <Route path='/essays' element={<Essays></Essays>}></Route>
            <Route path='/fiction' element={<Fictions></Fictions>}></Route>
            <Route path='/mysteryAndCrime' element={<MysteryAndCrimeBooks></MysteryAndCrimeBooks>}></Route>
            <Route path='/nonFiction' element={<NonFictionBooks></NonFictionBooks>}></Route>
            <Route path='/poetry' element={<PoetryBooks></PoetryBooks>}></Route>
            <Route path='rareBooks' element={<RareBooks></RareBooks>}></Route>
            <Route path='/sciFiFantasyAndHorror' element={<SciFiFantasyAndHorrorBooks></SciFiFantasyAndHorrorBooks>}></Route>
            <Route path='allBooks' element={<AllBooks></AllBooks>}></Route>

            <Route path='/NewArrivalBooks' element={<NewArrivalBooks></NewArrivalBooks>}></Route>
            <Route path='/topRatedBooks' element={<TopRatedBooks></TopRatedBooks>}></Route>

            <Route path='/bookDetails/:id' element={<BookDetails></BookDetails>}></Route>
            <Route path='/addReview/:id' element={<RequireAuth><RequireUser><AddReview></AddReview></RequireUser></RequireAuth>}></Route>


            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/details' element={<RequireAuth><Details></Details></RequireAuth>}></Route>
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
            <Route path='/editBook/:id' element={<RequireAdmin><EditBook></EditBook></RequireAdmin>}></Route>

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
