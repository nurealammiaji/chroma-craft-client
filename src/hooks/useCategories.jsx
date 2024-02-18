import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {

    const axiosPublic = useAxiosPublic();

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categories`)
            return res.data
        }
    })

    return [categories, isLoading];

};

export default useCategories;