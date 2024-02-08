import useAxiosSecure from "./useAxiosSecure";

const useCategory = () => {

    const axiosSecure = useAxiosSecure();

    const { isPending, isError, data: categories, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories')
            return res.data
        }
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

};

export default useCategory;