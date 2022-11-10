import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Essay from '../Essay/Essay';

const Essays = () => {
    const [essays, setEssays] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/essays')
            .then(res => res.json())
            .then(data => setEssays(data))
    }, []);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    essays.map(data => <Essay key={data._id} data={data}></Essay>)
                }
            </div>
        </section>
    );
};

export default Essays;