import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <section className='pt-[65px] bg-slate-300'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <h1 className='text-3xl text-center'>Welcome to the Dashboard</h1>
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard'>Order</Link></li>
                        <li><Link to='/dashboard/addBooks'>Add Books</Link></li>
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;