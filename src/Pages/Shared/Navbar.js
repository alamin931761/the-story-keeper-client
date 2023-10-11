import React, { useContext, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import auth from '../../firebase.init';
import { GiShoppingCart } from 'react-icons/gi';
import { RiMenu2Line } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import useShoppingCart from '../../Hooks/useShoppingCart';
import { SearchContext } from '../../Context/Search';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [search, setSearch] = useContext(SearchContext);

    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        signOut(auth);
    };

    const navigate = useNavigate();
    const searchRef = useRef('');
    const handleSearch = event => {
        event.preventDefault();
        const searchValue = searchRef.current.value.toLowerCase();
        setSearch(searchValue);
        navigate('/search');
        event.target.reset();
    }

    // cart data 
    const { savedCart } = useShoppingCart();
    // quantity
    const quantityArray = savedCart.map(book => book.quantity);
    let quantity = 0;
    for (const bookQuantity of quantityArray) {
        quantity = quantity + bookQuantity;
    }

    let item = 'Item';
    if (quantity > 1) {
        item = 'Items';
    }

    // subtotal 
    const subtotalArray = savedCart.map(book => book.subtotal);
    let subtotal = 0;
    for (const price of subtotalArray) {
        subtotal = subtotal + price;
    };

    // navbar 
    const menuItems = <>
        <div className="text-white flex items-center pl-4 nav-link"><NavLink className={({ isActive }) => isActive ? "active" : ""} to='/home'>Home</NavLink></div>

        <div className='z-50 dropdown dropdown-hover text-white'>
            <label tabIndex={0} className='flex items-center ml-4 nav-link'>Shop By Category</label>
            <ul tabIndex={0} className="bg-black dropdown-content rounded-lg">
                <div className='lg:flex lg:justify-center px-4'>
                    <div className='w-[230px]'>
                        <p className='font-semibold text-xl mt-3'>Top Categories</p>
                        <div>
                            <NavLink className="block my-3 nav-link" to='/essays'>Essays</NavLink>
                            <NavLink className="block my-3 nav-link" to='/fiction'>Fiction</NavLink>
                            <NavLink className="block my-3 nav-link" to='/nonFiction'>Non-Fiction</NavLink>
                            <NavLink className="block my-3 nav-link" to='/sciFiFantasyAndHorror'>Sci-Fi, Fantasy & Horror</NavLink>
                        </div>
                    </div>

                    <div className='w-[230px]'>
                        <p className='font-semibold text-xl mt-3'>More Categories</p>
                        <div>
                            <NavLink className="block my-3 nav-link" to='/artsAndMusic'>Arts & Music</NavLink>
                            <NavLink className="block my-3 nav-link" to='/mysteryAndCrime'>Mystery & Crime</NavLink>
                            <NavLink className="block my-3 nav-link" to='/poetry'>Poetry</NavLink>
                            <NavLink className="block my-3 nav-link" to='/rareBooks'>Rare Books</NavLink>
                        </div>
                    </div>
                </div>
                <NavLink className="block mb-3 nav-link text-center" to='/allBooks'>See All Books</NavLink>
            </ul>
        </div>

        <NavLink className='text-white flex items-center ml-4 nav-link' to='/contact'>Contact</NavLink>

        <NavLink className='text-white flex items-center ml-4 nav-link' to='/blogs'>Blogs</NavLink>

        {
            user && <>
                <NavLink className="text-white flex items-center ml-4 nav-link" to='/dashboard'>Dashboard</NavLink>
            </>
        }

        {
            user ? <li onClick={handleSignOut} className="text-white flex lg:items-center ml-4 cursor-pointer nav-link">Sign Out</li> : <NavLink to='/signIn' className='text-white flex items-center ml-4 nav-link'>Sign In</NavLink>
        }
    </>

    return (
        <div>
            <div className="navbar bg-black fixed z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <RiMenu2Line className='text-3xl text-white nav-link' />
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-[300px]">
                            {/* {menuItems} */}

                            <div className="menu text-white w-full rounded-box">
                                <div className="text-white flex items-center ml-4 my-1 nav-link"><NavLink to='/home'>Home</NavLink></div>
                                <div className='ml-4'>
                                    <details open1="true">
                                        <summary className='nav-link'>Shop By Category</summary>
                                        <div className='ml-6'>
                                            <details open2="true">
                                                <summary className='nav-link'>Top Categories</summary>
                                                <div className='ml-8'>
                                                    <NavLink className="block my-1 nav-link" to='/essays'>Essays</NavLink>
                                                    <NavLink className="block my-1 nav-link" to='/fiction'>Fiction</NavLink>
                                                    <NavLink className="block my-1 nav-link" to='/nonFiction'>Non-Fiction</NavLink>
                                                    <NavLink className="block my-1 nav-link" to='/sciFiFantasyAndHorror'>Sci-Fi, Fantasy & Horror</NavLink>
                                                </div>
                                            </details>

                                            <details open3="true">
                                                <summary className='nav-link'>More Categories</summary>
                                                <div className='ml-8'>
                                                    <NavLink className="block my-1 nav-link" to='/artsAndMusic'>Arts & Music</NavLink>
                                                    <NavLink className="block my-1 nav-link" to='/mysteryAndCrime'>Mystery & Crime</NavLink>
                                                    <NavLink className="block my-1 nav-link" to='/poetry'>Poetry</NavLink>
                                                    <NavLink className="block my-1 nav-link" to='/rareBooks'>Rare Books</NavLink>
                                                </div>
                                            </details>
                                        </div>
                                        <NavLink className="block my-1 nav-link ml-6" to='/allBooks'>See All Books</NavLink>
                                    </details>
                                </div>
                                <NavLink className='text-white flex items-center ml-4 my-1 nav-link' to='/contact'>Contact</NavLink>
                                <NavLink className='text-white flex items-center ml-4 my-1 nav-link' to='/blogs'>Blogs</NavLink>

                                {
                                    user && <>
                                        <NavLink className="text-white flex items-center ml-4 my-1 nav-link" to='/dashboard'>Dashboard</NavLink>
                                    </>
                                }

                                {
                                    user ? <li onClick={handleSignOut} className="text-white flex lg:items-center ml-4 cursor-pointer my-1 nav-link">Sign Out</li> : <NavLink to='/signIn' className='text-white flex items-center ml-4 my-1 nav-link'>Sign In</NavLink>
                                }
                            </div>
                        </ul>
                    </div>

                    {/* logo */}
                    <Link className='flex items-center' to='/home'><img width="320px" src={logo} alt="logo" /></Link>
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
                                    <BiSearch className='text-3xl text-white nav-link' />
                                </button>
                            </label>
                            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-[270px] bg-base-100 shadow">
                                <form onSubmit={handleSearch}>
                                    <input ref={searchRef} type="text" placeholder="Search by Title, Author or ISBN" className="input input-bordered w-full max-w-sm bg-black text-white" />
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* cart start  */}
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <GiShoppingCart className='text-3xl text-white nav-link' />
                                    <span className="badge badge-sm indicator-item text-[#FFFF00]">{quantity}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body bg-black">
                                    <span className="font-bold text-xl text-white">{quantity} <span className='second-font'>{item}</span></span>
                                    <span className="text-white text-base"><span className='second-font'>Subtotal:</span> ${subtotal}</span>
                                    <div className="card-actions">
                                        <Link className='btn btn-outline btn-success w-full transition ease-linear duration-500' to='/cart'><GiShoppingCart className="text-2xl mr-2" />View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* cart end  */}
                </div>
            </div>
        </div >
    );
};

export default Navbar;