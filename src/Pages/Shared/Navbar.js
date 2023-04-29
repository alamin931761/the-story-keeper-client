import { signOut } from 'firebase/auth';
import React, { useContext, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { BookDetailsContext, SearchContext } from '../../App';
import logo from '../../assets/images/logo.png';
import auth from '../../firebase.init';
import { GiShoppingCart } from 'react-icons/gi';
import { RiMenu2Line } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [search, setSearch] = useContext(SearchContext);

    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem("accessToken");
    };

    const navigate = useNavigate();
    const searchRef = useRef('');
    const handleSearch = event => {
        event.preventDefault();
        const searchValue = searchRef.current.value.toLowerCase();
        setSearch(searchValue);
        navigate('/search')
        event.target.reset()
    }

    // cart data 
    const [bookData, setBookData] = useContext(BookDetailsContext);
    const booksPrice = bookData.map(book => book.subtotal);
    const booksQuantity = bookData.map(book => book.quantity);

    let subtotal = 0;
    for (const price of booksPrice) {
        subtotal = subtotal + price;
    };

    // quantity
    let quantity = 0;
    for (const bookQuantity of booksQuantity) {
        quantity = quantity + bookQuantity;
    }

    let item = 'Item';
    if (quantity.length > 1) {
        item = 'Items';
    }

    // navbar 
    const menuItems = <>
        <li className='text-white'><Link to='/home'>Home</Link></li>
        <li className='z-50' tabIndex="0">
            <span className='text-white'>Shop By Category</span>
            <ul className="p-2 bg-lime-800">
                <div className='flex justify-center'>
                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl text-white'>Top Categories</p>
                        <div>
                            <li className='text-white'><Link to='/essays'>Essays</Link></li>
                            <li className='text-white'><Link to='/fiction'>Fiction</Link></li>
                            <li className='text-white'><Link to='/nonFiction'>Non-Fiction</Link></li>
                            <li className='text-white'><Link to='/sciFiFantasyAndHorror'>Sci-Fi, Fantasy & Horror</Link></li>
                        </div>
                    </div>

                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl text-white'>More Categories</p>
                        <div>
                            <li className='text-white'><Link to='/artsAndMusic'>Arts & Music</Link></li>
                            <li className='text-white'><Link to='/mysteryAndCrime'>Mystery & Crime</Link></li>
                            <li className='text-white'><Link to='/poetry'>Poetry</Link></li>
                            <li className='text-white'><Link to='/rareBooks'>Rare Books</Link></li>
                        </div>
                    </div>
                </div>
            </ul>
        </li>
        <li className=' text-white'><Link to='/contact'>Contact</Link></li>
        {
            user && <>
                <li className='text-white'><Link to='/dashboard'>Dashboard</Link></li>
            </>
        }
        {
            user ? <li onClick={handleSignOut} className="text-white text-sm lg:text-base flex lg:items-center pl-4 cursor-pointer">Sign Out</li> : <Link to='/signIn' className='text-white text-sm lg:text-base flex items-center pl-4'>Sign In</Link>
        }
    </>

    return (
        <section>
            <div className="navbar bg-emerald-900 fixed z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <RiMenu2Line className='text-3xl text-white' />
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-red-800 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>

                    {/* logo */}
                    <Link className='flex items-center' to='/home'><img className='inline-block' src={logo} alt="logo" /> <span className='font-medium whitespace-nowrap text-2xl  text-white'>The Story Keeper</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

                {/* search  */}
                <div className="navbar-end">
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <button className="btn btn-ghost btn-circle">
                                    <BiSearch className='text-3xl text-white' />
                                </button>
                            </label>
                            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-60 bg-base-100 shadow">
                                <form onSubmit={handleSearch}>
                                    <input ref={searchRef} type="text" placeholder="Search" className="input input-bordered w-full max-w-sm bg-lime-800 text-white" />
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* cart start  */}
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <GiShoppingCart className='text-3xl text-white' />
                                    <span className="badge badge-sm indicator-item text-yellow-300">{quantity}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body bg-lime-800">
                                    <span className="font-bold text-xl">{quantity} {item}</span>
                                    <span className="text-info text-base">Subtotal: ${subtotal}</span>
                                    <div className="card-actions">
                                        <Link className='btn btn-primary w-full' to='/cart'>View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* cart end  */}
                </div>
            </div>
        </section >
    );
};

export default Navbar;