import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useInstructors = () => {

    const axiosPublic = useAxiosPublic();

    const { data: instructors, refetch: refetchInstructors, isLoading: instructorsLoading } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/instructors`)
            return res.data
        }
    })

    return [instructors, refetchInstructors, instructorsLoading];
};

export default useInstructors;