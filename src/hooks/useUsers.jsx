import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useUsers = () => {

    const { user, loading } = useContext(AuthContext);

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://chroma-craft-server.vercel.app/users/${user.email}`)
            return res.json()
        }
    })

    // console.log(data);
    return [userData, userLoading];
};

export default useUsers;