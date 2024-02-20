import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';

const useEnrolled = () => {

    const axiosPublic = useAxiosPublic();

    const { refetch, data: enrolled, isLoading } = useQuery({
        queryKey: ['enrolled'],
        queryFn: async () => {
            const res = await axiosPublic.get("/enrolled")
            return res.data
        }
    })

    return [enrolled, refetch, isLoading];
};

export default useEnrolled;