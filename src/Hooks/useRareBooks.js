import { useEffect } from "react";
import { useState } from "react"

const useRareBooks = () => {
    const [rareBooks, setRareBooks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/rareBooks')
            .then(res => res.json())
            .then(data => setRareBooks(data))
    }, []);
    return [rareBooks, setRareBooks];
}

export default useRareBooks;