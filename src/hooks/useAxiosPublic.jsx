import axios from "axios";

const useAxiosPublic = () => {

    const axiosPublic = axios.create({
        baseURL: 'https://chroma-craft-server.vercel.app'
    })

    return axiosPublic;

};

export default useAxiosPublic;