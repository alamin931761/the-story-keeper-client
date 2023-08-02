import React from 'react';
import { Link } from 'react-router-dom';

const FrequentlyAskedQuestions = () => {
    return (
        <div className='my-10' data-aos="fade-down" data-aos-duration="1000">
            <h2 className='text-3xl text-center my-6'>Frequently Asked Questions</h2>

            <div>
                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">I can't sign in to my account</div>
                    <div className="collapse-content" >
                        <p>If you've forgotten your password, please go to the <Link className='text-blue-500 hover:underline' to='/signIn'>Sign in</Link> page and follow the link 'Reset Password'.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">How do I change my password and details?</div>
                    <div className="collapse-content">
                        <p>To change your password, go to <Link className='text-blue-500 hover:underline' to='/dashboard'>Dashboard</Link> page and then click on <Link className='text-blue-500 hover:underline' to='/dashboard/myProfile'>My Profile</Link>. You can also change or delete personal information, such as your image, address, and phone number.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">How can I delete my account?</div>
                    <div className="collapse-content">
                        <p>If you wish to delete your account, contact us at <a className='text-blue-500 hover:underline' href="mailto:alamin931761@gmail.com">alamin931761@gmail.com</a> so we can proceed erasing your account. This action will result in the deletion of all your order history and no rollback will be possible.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">What are the payment options?</div>
                    <div className="collapse-content">
                        <p>The website accepts credit card and debit card payments from most major banks worldwide. We are not able to accept payments by check for purchases made online.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">How long will it take for my refund to be processed?</div>
                    <div className="collapse-content">
                        <p>Once we have received your return, your refund will take approximately 14 days to appear in your account to allow enough time for us to process the return.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">How long do I have to return my items?</div>
                    <div className="collapse-content">
                        <p>You have a period of 14 (fourteen) days from receipt of your order to return an item that does not suit you.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">Delivery options & deadlines?</div>
                    <div className="collapse-content">
                        <p className='font-medium'>We propose 2 delivery options:</p>
                        <p><span className='font-medium'>Home Delivery - Standard:</span> average delivery  between 7-10 working days (we don't work on week-ends or on public holidays)</p>
                        <p> <span className='font-medium'>Home Delivery - Express:</span>average delivery  between 2-3 working days (we don't work on week-ends or on public holidays)</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-[#000000] bg-[#DFF6FF] mb-1 rounded-box" data-aos="zoom-in-up" data-aos-duration="3000">
                    <div className="collapse-title text-xl font-medium">What if my order was not delivered or lost?</div>
                    <div className="collapse-content">
                        <p>If your order was not delivered or lost, please get in touch with our Customer Service by email at <a className='text-blue-500 hover:underline' href="mailto:alamin931761@gmail.com">alamin931761@gmail.com</a>. Our team will contact the carrier to initiate the necessary procedures. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestions;