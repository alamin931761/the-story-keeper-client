import { useState } from "react"

const useFirebase = () => {
    const [user, setUser] = useState({});
    return [user, setUser];
}
export default useFirebase;