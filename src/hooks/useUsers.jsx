import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {

    const { loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: users, refetch: refetchUsers, isLoading: usersLoading } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/`)
            return res.data
        }
    })

    return [users, usersLoading, refetchUsers];
};

export default useUsers;