import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useInstructor = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: instructorData, refetch: refetchInstructor, isLoading: instructorLoading } = useQuery({
        queryKey: ['instructors', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/instructors/details/${user?.email}`)
            return res.data
        }
    })

    console.log(instructorData);
    return [instructorData, instructorLoading, refetchInstructor];
};

export default useInstructor;