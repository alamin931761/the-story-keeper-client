import React from 'react';
import { Link } from 'react-router-dom';

const FrequentlyAskedQuestions = () => {
    return (
        <div>
            <h2 className='text-3xl text-center'>Frequently Asked Questions</h2>
            {/* My online account */}
            <div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div className="collapse-title text-xl font-medium">How do I sign in?</div>
                    <div className="collapse-content">
                        <p>To sign in to your account, click the <Link className='text-blue-500 hover:underline' to='/signIn'>Sign In</Link> link in the navigation bar. Enter your email address and password then click 'Sign in'.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div className="collapse-title text-xl font-medium">I can't sign in to my account</div>
                    <div className="collapse-content">
                        <p>If you've forgotten your password, please go to the <Link className='text-blue-500 hover:underline' to='/signIn'>Sign in</Link> page and follow the link 'Reset Password'.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div className="collapse-title text-xl font-medium">How do I change my password and details?</div>
                    <div className="collapse-content">
                        <p>To change your password, go to <Link className='text-blue-500 hover:underline' to='/dashboard'>Dashboard</Link> page and then click on <Link className='text-blue-500 hover:underline' to='/dashboard/myProfile'>My Profile</Link>. You can also change or delete personal information, such as your image, address, and phone number.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div className="collapse-title text-xl font-medium">How can I delete my account ?</div>
                    <div className="collapse-content">
                        <p>If you wish to delete your account, contact us at <a className='text-blue-500 hover:underline' href="mailto:alamin931761@gmail.com">alamin931761@gmail.com</a> so we can proceed erasing your account. This action will result in the deletion of all your order history and no rollback will be possible.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestions;