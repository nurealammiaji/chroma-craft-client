import { useQuery } from "@tanstack/react-query";

const useCategories = () => {

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`https://chroma-craft-server.vercel.app/categories`)
            return res.json()
        }
    })

    return [categories, isLoading];

};

export default useCategories;