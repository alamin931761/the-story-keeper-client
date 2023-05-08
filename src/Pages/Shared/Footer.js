import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className="footer footer-center p-10 bg-black text-base-content rounded">
            <div className="grid grid-flow-col gap-4 text-white">
                <a className="link link-hover" href='wwww'>About us</a>
                <a className="link link-hover" href='wwww'>Contact</a>
                <a className="link link-hover" href='wwww'>Blogs</a>
            </div>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://wwww.facebook.com"><FaFacebookF className='text-white text-4xl' /></a>
                    <a href="https://wwww.facebook.com"><FaTwitter className='text-white text-4xl' /></a>
                    <a href="https://wwww.facebook.com"><FaInstagram className='text-white text-4xl' /></a>
                </div>
            </div>
            <div>
                <p className='text-white'>Copyright &copy; {year} - All right reserved by The Story Keeper</p>
            </div>
        </footer>
    );
};

export default Footer;