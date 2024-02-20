import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSelected = () => {

    const axiosPublic = useAxiosPublic();

    const { refetch, data: selected, isLoading } = useQuery({
        queryKey: ['selected'],
        queryFn: async () => {
            const res = await axiosPublic.get("/selected")
            return res.data
        }
    })

    return [selected, refetch, isLoading];
};

export default useSelected;