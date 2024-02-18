import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useClasses = () => {

    const axiosPublic = useAxiosPublic();

    const { data: classes, isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes`)
            return res.data
        }
    })


    return [classes, isLoading];

};

export default useClasses;