import { createContext } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import Orders from './Pages/Dashboard/Orders/Orders';

export const BookDetailsContext = createContext();
export const TotalContext = createContext();
function App() {
  const [bookData, setBookData] = useState([]);
  return (
    <div className="App">
      <BookDetailsContext.Provider value={[bookData, setBookData]}>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/NewArrivalBooks' element={<NewArrivalBooks></NewArrivalBooks>}></Route>
          <Route path='/essays' element={<Essays></Essays>}></Route>
          <Route path='/fiction' element={<Fictions></Fictions>}></Route>
          <Route path='/nonFiction' element={<NonFictionBooks></NonFictionBooks>}></Route>
          <Route path='/sciFiFantasyAndHorror' element={<SciFiFantasyAndHorrorBooks></SciFiFantasyAndHorrorBooks>}></Route>
          <Route path='/artsAndMusic' element={<ArtsAndMusicBooks></ArtsAndMusicBooks>}></Route>
          <Route path='/mysteryAndCrime' element={<MysteryAndCrimeBooks></MysteryAndCrimeBooks>}></Route>
          <Route path='/poetry' element={<PoetryBooks></PoetryBooks>}></Route>
          <Route path='rareBooks' element={<RareBooks></RareBooks>}></Route>
          <Route path='/bookDetails/:id' element={<BookDetails></BookDetails>}></Route>
          <Route path='/signIn' element={<SignIn></SignIn>}></Route>
          <Route path='/signUp' element={<SignUp></SignUp>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
            <Route index element={<Orders></Orders>}></Route>
            <Route path='addBooks' element={<AddBooks></AddBooks>}></Route>
          </Route>
          <Route path='/checkout' element={<RequireAuth><Checkout></Checkout></RequireAuth>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
        <Footer></Footer>
      </BookDetailsContext.Provider>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
