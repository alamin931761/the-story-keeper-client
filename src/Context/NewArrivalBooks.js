import { createContext, useState } from "react";

export const NEW_ARRIVAL_CONTEXT = createContext();
const NewArrivalBooks = ({ children }) => {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [sliderValue, setSliderValue] = useState([0, 2000]);
    const [minimumSliderValue, maximumSliderValue] = sliderValue;

    return (
        <NEW_ARRIVAL_CONTEXT.Provider value={{ count, setCount, page, setPage, size, setSize, sliderValue, setSliderValue, minimumSliderValue, maximumSliderValue }}>
            {children}
        </NEW_ARRIVAL_CONTEXT.Provider>
    );
};

export default NewArrivalBooks;