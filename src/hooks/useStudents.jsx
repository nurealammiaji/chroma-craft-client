import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStudents = () => {

    const axiosSecure = useAxiosSecure();

    const { data: students, isLoading } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/students`)
            return res.data
        }
    })

    return [students, isLoading];

};

export default useStudents;