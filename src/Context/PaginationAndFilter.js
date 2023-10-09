import { createContext, useState } from 'react';

export const PAGINATION_AND_FILTER_CONTEXT = createContext();

const PaginationAndFilter = ({ children }) => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [sorted, setSorted] = useState("default");
    const [sliderValue, setSliderValue] = useState([0, 2000]);
    const [minimumSliderValue, maximumSliderValue] = sliderValue;
    const [category, setCategory] = useState('');

    return (
        <PAGINATION_AND_FILTER_CONTEXT.Provider value={{ count, setCount, page, setPage, sorted, setSorted, sliderValue, setSliderValue, size, setSize, minimumSliderValue, maximumSliderValue, category, setCategory }}>
            {children}
        </PAGINATION_AND_FILTER_CONTEXT.Provider>
    );
};

export default PaginationAndFilter;