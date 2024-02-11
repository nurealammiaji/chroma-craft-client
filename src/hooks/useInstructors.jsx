import { useQuery } from "@tanstack/react-query";

const useInstructors = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['instructors'],
        queryFn: () =>
            fetch('https://chroma-craft-server.vercel.app/instructors').then((res) =>
                res.json(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data);
    return data;
};

export default useInstructors;