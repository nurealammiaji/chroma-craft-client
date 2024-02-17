import { useQuery } from "@tanstack/react-query";

const useStudents = () => {

    const { data: students, isLoading } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await fetch(`https://chroma-craft-server.vercel.app/students`)
            return res.json()
        }
    })

    return [students, isLoading];

};

export default useStudents;