import { useEffect, useState } from "react";

const useCategories = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState();

    useEffect(() => {
        fetch('https://chroma-craft-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
        setLoading(false);
    }, [])

    return [categories, loading];

};

export default useCategories;