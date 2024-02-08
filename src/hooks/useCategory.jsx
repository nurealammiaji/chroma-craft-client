import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCategory = () => {

    const axiosPublic = useAxiosPublic();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories')
            return res.data
        }
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log(data);
    return [data, isPending];

};

export default useCategory;