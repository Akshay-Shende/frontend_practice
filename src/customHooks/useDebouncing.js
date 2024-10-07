import {useState, useEffect} from "react";
const useDebouncing = (searchTerm, delay = 500) => {

    const [debounceValue, setDebounceValue] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(searchTerm);
        }, delay);
        return () => clearTimeout(handler);
   
    }, [searchTerm, delay]);

  return debounceValue
}

export default useDebouncing
