import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useSelected = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { refetch: refetchSelected, data: selected, isLoading: isLoadingSelected } = useQuery({
        queryKey: ['selected', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/selected?email=${user?.email}`)
            return res.data
        }
    })

    return [selected, refetchSelected, isLoadingSelected];
};

export default useSelected;