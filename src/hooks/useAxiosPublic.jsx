import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://chroma-craft-server.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;