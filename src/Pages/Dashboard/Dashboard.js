import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { RiMenu3Line } from 'react-icons/ri';
import { GiPartyPopper } from 'react-icons/gi';
import useAdmin from '../../Hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <section className='pt-[65px] bg-slate-300'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className='text-right'>
                        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden"><RiMenu3Line className='text-3xl' /></label>
                    </div>

                    <div className='flex justify-center items-center mt-4'>
                        <GiPartyPopper className='inline text-4xl' />
                        <h2 className='text-3xl'>Welcome to the Dashboard</h2>
                        <GiPartyPopper className='inline text-4xl' />
                    </div>

                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        {admin &&
                            <>
                                <li><Link to='/dashboard/addBooks'>Add Books</Link></li>
                                <li><Link to='/dashboard/manageBooks'>Manage Books</Link></li>
                                <li><Link to='/dashboard/orders'>Orders</Link></li>
                                <li><Link to='/dashboard/users'>Users</Link></li>
                            </>
                        }
                        {
                            !admin && <>
                                <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                                <li><Link to='/dashboard/addReview'>Add Review</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;