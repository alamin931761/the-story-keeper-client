import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart/Cart';
import EssayDetails from './Pages/EssayDetails/EssayDetails';
import Essays from './Pages/Essays/Essays';
import FictionDetails from './Pages/FictionDetails/FictionDetails';
import Fictions from './Pages/Fictions/Fictions';
import Home from './Pages/Home/Home';
import NonFiction from './Pages/NonFiction/NonFiction';
import NonFictionDetails from './Pages/NonFictionDetails/NonFictionDetails';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import SignIn from './Pages/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/essays' element={<Essays></Essays>}></Route>
        <Route path='/essayDetails/:id' element={<EssayDetails></EssayDetails>}></Route>
        <Route path='/fictions' element={<Fictions></Fictions>}></Route>
        <Route path='/fictionDetails/:id' element={<FictionDetails></FictionDetails>}></Route>
        <Route path='/nonFiction' element={<NonFiction></NonFiction>}></Route>
        <Route path='/nonFictionDetails/:id' element={<NonFictionDetails></NonFictionDetails>}></Route>
        <Route path='/signIn' element={<SignIn></SignIn>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
