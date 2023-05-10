import { useEffect } from "react";
import { useState } from "react"

const useAllBooks = () => {
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allBooks')
            .then(res => res.json())
            .then(data => setAllBooks(data));
    }, [allBooks]);
    return [allBooks, setAllBooks];
}
export default useAllBooks;