import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <section className='bg-emerald-900 p-2'>
            <p className='text-center'><small>Copyright &copy; Lorem ipsum dolor sit amet.</small></p>
        </section>
    );
};

export default Footer;