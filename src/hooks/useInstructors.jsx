import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useInstructors = () => {

    const axiosPublic = useAxiosPublic();

    const { data: instructors, isLoading } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/instructors`)
            return res.data
        }
    })

    return [instructors, isLoading];
};

export default useInstructors;