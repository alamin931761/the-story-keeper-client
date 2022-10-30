import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const menuItems = <>
        <li className='mr-5'><Link to='/home'>Home</Link></li>
        <li tabindex="0">
            <span>Shop By Category</span>
            <ul class="p-2 bg-lime-800">
                <div className='flex justify-center'>
                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl'>Top Categories</p>
                        <div>
                            <li><Link to='/artAndPhotography'>Art & Photography</Link></li>
                            <li><Link to='/biography'>Biography</Link></li>
                            <li><Link to='/kidsBooks'>Kids Books</Link></li>
                            <li><Link to='/fiction'>Fiction</Link></li>
                            <li><Link to='/nonFiction'>Non-Fiction</Link></li>
                        </div>
                    </div>

                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl'>More Categories</p>
                        <div>
                            <li><Link to='/romance'>Romance</Link></li>
                            <li><Link to='/mystery'>Mystery</Link></li>
                            <li><Link to='/health'>Health</Link></li>
                            <li><Link to='/poetry'>Poetry</Link></li>
                            <li><Link to='/rareBooks'>Crime & Thriller</Link></li>
                        </div>
                    </div>

                    <div className='w-[250px]'>
                        <p className='font-semibold text-xl'>Bestselling Series</p>
                        <div>
                            <li><Link to='/harryPotter'>Harry Potter</Link></li>
                            <li><Link to='/mystery'>Game Of Thrones</Link></li>
                            <li><Link to='/health'>Star Wars</Link></li>
                            <li><Link to='/poetry'>Divergent</Link></li>
                            <li><Link to='/rareBooks'>Throne Of Glass</Link></li>
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
            <div className="navbar bg-emerald-900">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>

                    {/* logo */}
                    <Link className='flex items-center' to='/home'><img className='inline-block' src={logo} alt="logo" /> <span className='font-medium text-3xl ml-2'>The Story Keeper</span></Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;