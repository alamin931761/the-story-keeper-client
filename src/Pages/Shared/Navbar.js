import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { BookDetailsContext } from '../../App';
import logo from '../../assets/images/logo.png';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    };

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
        <li className='mr-5'><Link to='/home'>Home</Link></li>
        <li className='z-50' tabIndex="0">
            <span>Shop By Category</span>
            <ul className="p-2 bg-lime-800">
                <div className='flex justify-center'>
                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl'>Top Categories</p>
                        <div>
                            <li><Link to='/essays'>Essays</Link></li>
                            <li><Link to='/fictions'>Fiction</Link></li>
                            <li><Link to='/nonFiction'>Non-Fiction</Link></li>
                            <li><Link to='/sciFiFantasyAndHorror'>Sci-Fi, Fantasy & Horror</Link></li>
                        </div>
                    </div>

                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl'>More Categories</p>
                        <div>
                            <li><Link to='/artsAndMusic'>Arts & Music</Link></li>
                            <li><Link to='/mysteryAndCrime'>Mystery & Crime</Link></li>
                            <li><Link to='/poetry'>Poetry</Link></li>
                            <li><Link to='/rareBooks'>Rare Books</Link></li>
                        </div>
                    </div>
                </div>
            </ul>
        </li>
        <li className='mr-5'><Link to='/contact'>Contact</Link></li>
        <li className='mr-5'><Link to='/signIn'>Sign In</Link></li>
    </>

    return (
        <section>
            <div className="navbar bg-emerald-900 fixed z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>

                    {/* logo */}
                    <Link className='flex items-center' to='/home'><img className='inline-block' src={logo} alt="logo" /> <span className='font-medium whitespace-nowrap text-2xl'>The Story Keeper</span></Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

                <div className="navbar-end">
                    {/* cart start  */}
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{quantity}</span>
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

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-lime-800 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><Link className='btn btn-danger w-full' to='/dashboard'>Dashboard</Link></li>
                            {
                                user ? <button onClick={handleSignOut} className='btn btn-primary mt-2'>Sign Out</button> : <Link to='/signIn' className='btn btn-primary'>Sign In</Link>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Navbar;