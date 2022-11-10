import { Route, Routes } from 'react-router-dom';
import './App.css';
import EssayDetails from './Pages/EssayDetails/EssayDetails';
import Essays from './Pages/Essays/Essays';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import RareBookDetails from './Pages/RareBookDetails/RareBookDetails';
import RareBooks from './Pages/RareBooks/RareBooks';
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
        <Route path='/rareBooks' element={<RareBooks></RareBooks>}></Route>
        <Route path='/rareBookDetails/:id' element={<RareBookDetails></RareBookDetails>}></Route>
        <Route path='/essays' element={<Essays></Essays>}></Route>
        <Route path='/essayDetails/:id' element={<EssayDetails></EssayDetails>}></Route>
        <Route path='/signIn' element={<SignIn></SignIn>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
