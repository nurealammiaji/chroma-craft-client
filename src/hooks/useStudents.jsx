import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';

const useStudents = () => {

    const axiosPublic = useAxiosPublic();

    const { data: students, isLoading } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/students`)
            return res.data
        }
    })

    return [students, isLoading];

};

export default useStudents;