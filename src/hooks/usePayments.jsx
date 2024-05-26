import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePayments = () => {

    const axiosPublic = useAxiosPublic();

    const { data: payments, refetch: refetchPayments, isLoading: paymentsLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments`)
            return res.data
        }
    })

    return [payments, refetchPayments, paymentsLoading];

};

export default usePayments;