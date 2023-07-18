import { Route, Routes } from 'react-router-dom';
import './App.css';
import { createContext } from 'react';
import { useState } from 'react';
import ArtsAndMusicBooks from './Pages/ArtAndMusicBooks/ArtsAndMusicBooks';
import BookDetails from './Pages/BookDetails/BookDetails';
import Cart from './Pages/Cart/Cart';
import Essays from './Pages/Essays/Essays';
import Fictions from './Pages/Fictions/Fictions';
import Home from './Pages/Home/Home';
import MysteryAndCrimeBooks from './Pages/MysteryAndCrimeBooks/MysteryAndCrimeBooks';
import NewArrivalBooks from './Pages/NewArrivalBooks/NewArrivalBooks';
import NonFictionBooks from './Pages/NonFictionBooks/NonFictionBooks';
import NotFound from './Pages/NotFound/NotFound';
import PoetryBooks from './Pages/PoetryBooks/PoetryBooks';
import RareBooks from './Pages/RareBooks/RareBooks';
import SciFiFantasyAndHorrorBooks from './Pages/SciFiFantasyAndHorrorBooks/SciFiFantasyAndHorrorBooks';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import SignIn from './Pages/SignIn/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './Pages/Contact/Contact';
import SignUp from './Pages/SignIn/SignUp';
import Checkout from './Pages/Checkout/Checkout';
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
import AddReview from './Pages/Dashboard/AddReview/AddReview';
import RequireUser from './Pages/SignIn/RequireUser/RequireUser';
import EditBook from './Pages/Dashboard/EditBook/EditBook';
import Search from './Pages/Search/Search';
import Blogs from './Pages/Blogs/Blogs';
import BestSellingBooks from './Pages/BestSellingBooks/BestSellingBooks';
import AllBooks from './Pages/AllBooks/AllBooks';
import Welcome from './Pages/Dashboard/Welcome/Welcome';

export const BookDetailsContext = createContext();
export const OrderContext = createContext();
export const SearchContext = createContext();

function App() {
  const [bookData, setBookData] = useState([]);
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <BookDetailsContext.Provider value={[bookData, setBookData]}>
        <OrderContext.Provider value={[order, setOrder]}>
          <SearchContext.Provider value={[search, setSearch]}>
            <Navbar></Navbar>
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/home' element={<Home></Home>}></Route>
              <Route path='/NewArrivalBooks' element={<NewArrivalBooks></NewArrivalBooks>}></Route>
              <Route path='/bestSellingBooks' element={<BestSellingBooks></BestSellingBooks>}></Route>
              <Route path='/essays' element={<Essays></Essays>}></Route>
              <Route path='/fiction' element={<Fictions></Fictions>}></Route>
              <Route path='/nonFiction' element={<NonFictionBooks></NonFictionBooks>}></Route>
              <Route path='/sciFiFantasyAndHorror' element={<SciFiFantasyAndHorrorBooks></SciFiFantasyAndHorrorBooks>}></Route>
              <Route path='/artsAndMusic' element={<ArtsAndMusicBooks></ArtsAndMusicBooks>}></Route>
              <Route path='/mysteryAndCrime' element={<MysteryAndCrimeBooks></MysteryAndCrimeBooks>}></Route>
              <Route path='/poetry' element={<PoetryBooks></PoetryBooks>}></Route>
              <Route path='rareBooks' element={<RareBooks></RareBooks>}></Route>
              <Route path='allBooks' element={<AllBooks></AllBooks>}></Route>
              <Route path='/bookDetails/:id' element={<BookDetails></BookDetails>}></Route>
              <Route path='/editBook/:id' element={<RequireAdmin><EditBook></EditBook></RequireAdmin>}></Route>
              <Route path='/signIn' element={<SignIn></SignIn>}></Route>
              <Route path='/signUp' element={<SignUp></SignUp>}></Route>
              <Route path='/search' element={<Search></Search>}></Route>
              <Route path='/blogs' element={<Blogs></Blogs>}></Route>
              <Route path='/cart' element={<Cart></Cart>}></Route>
              <Route path='/details' element={<RequireAuth><Details></Details></RequireAuth>}></Route>
              <Route path='/contact' element={<Contact></Contact>}></Route>
              <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
                <Route index element={<Welcome></Welcome>}></Route>
                <Route path='myProfile' element={<MyProfile></MyProfile>}></Route>
                <Route path='myOrders' element={<MyOrders></MyOrders>}></Route>
                <Route path='orders' element={<RequireAdmin><Orders></Orders></RequireAdmin>}></Route>
                <Route path='addBooks' element={<RequireAdmin><AddBooks></AddBooks></RequireAdmin>}></Route>
                <Route path='addReview' element={<RequireUser><AddReview></AddReview></RequireUser>}></Route>
                <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
                <Route path='manageBooks' element={<RequireAdmin><ManageBooks></ManageBooks></RequireAdmin>}></Route>
              </Route>
              <Route path='/checkout' element={<RequireAuth><Checkout></Checkout></RequireAuth>}></Route>
              <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
            <Footer></Footer>
          </SearchContext.Provider>
        </OrderContext.Provider>
      </BookDetailsContext.Provider>
      <ToastContainer></ToastContainer>
    </div >
  );
}

export default App;
