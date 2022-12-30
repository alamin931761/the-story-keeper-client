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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BookDetailsContext = createContext();
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
          <Route path='/fictions' element={<Fictions></Fictions>}></Route>
          <Route path='/nonFiction' element={<NonFictionBooks></NonFictionBooks>}></Route>
          <Route path='/SciFiFantasyAndHorror' element={<SciFiFantasyAndHorrorBooks></SciFiFantasyAndHorrorBooks>}></Route>
          <Route path='/artsAndMusic' element={<ArtsAndMusicBooks></ArtsAndMusicBooks>}></Route>
          <Route path='/mysteryAndCrime' element={<MysteryAndCrimeBooks></MysteryAndCrimeBooks>}></Route>
          <Route path='/poetry' element={<PoetryBooks></PoetryBooks>}></Route>
          <Route path='rareBooks' element={<RareBooks></RareBooks>}></Route>
          <Route path='/bookDetails/:id' element={<BookDetails></BookDetails>}></Route>
          <Route path='/signIn' element={<SignIn></SignIn>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
        <Footer></Footer>
      </BookDetailsContext.Provider>
    </div>
  );
}

export default App;
