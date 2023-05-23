import { useEffect } from "react";
import { useState } from "react"

const useAllBooks = () => {
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        fetch('https://the-story-keeper-server-ten.vercel.app/allBooks')
            .then(res => res.json())
            .then(data => setAllBooks(data));
    }, [allBooks]);
    return [allBooks, setAllBooks];
}
export default useAllBooks;