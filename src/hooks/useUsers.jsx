import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: userData, refetch: refetchUser, isLoading: userLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`)
            return res.data
        }
    })

    // console.log(data);
    return [userData, userLoading, refetchUser];
};

export default useUsers;