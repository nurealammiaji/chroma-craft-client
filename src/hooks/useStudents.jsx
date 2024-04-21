import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';

const useStudents = () => {

    const axiosPublic = useAxiosPublic();

    const { data: students, isLoading: studentsLoading, refetch: refetchStudents } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/students`)
            return res.data
        }
    })

    return [students, studentsLoading, refetchStudents];

};

export default useStudents;