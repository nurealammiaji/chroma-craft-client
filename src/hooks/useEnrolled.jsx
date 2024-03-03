import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './useAxiosPublic';
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useEnrolled = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { refetch: refetchEnrolled, data: enrolled, isLoading: isLoadingEnrolled } = useQuery({
        queryKey: ['enrolled', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/enrolled?email=${user?.email}`)
            return res.data
        }
    })

    return [enrolled, refetchEnrolled, isLoadingEnrolled];
};

export default useEnrolled;