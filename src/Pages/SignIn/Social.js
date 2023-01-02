import React from 'react';

const Social = () => {
    return (
        <section>
            <div className="divider">OR</div>
            <div className='flex flex-col justify-center mb-3'>
                <button className='btn btn-success mt-3 w-1/4 mx-auto'>Continue with Google</button>
                <button className='btn btn-success mt-3 w-1/4 mx-auto'>Continue with Github</button>
                <button className='btn btn-success mt-3 w-1/4 mx-auto'>Continue with Facebook</button>
            </div>
        </section>
    );
};

export default Social;