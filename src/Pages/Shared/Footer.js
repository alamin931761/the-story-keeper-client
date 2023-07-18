import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className="footer footer-center p-10 bg-black text-base-content">
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a target='_blank' href="https://wwww.facebook.com"><FaFacebookF className='social-icon text-4xl' /></a>
                    <a target='_blank' href="https://twitter.com/"><FaTwitter className='social-icon text-4xl' /></a>
                    <a target='_blank' href="https://www.instagram.com/"><FaInstagram className='social-icon text-4xl' /></a>
                </div>
            </div>
            <div>
                <p className='text-white'>Copyright &copy; {year} - All right reserved by The Story Keeper</p>
            </div>
        </footer>
    );
};

export default Footer;