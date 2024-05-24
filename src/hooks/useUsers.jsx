import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {

    const axiosPublic = useAxiosPublic();
    const { loading } = useContext(AuthContext);

    const { refetch: refetchUsers, data: users, isLoading: usersLoading } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })

    return [users, refetchUsers, usersLoading];
};

export default useUsers;