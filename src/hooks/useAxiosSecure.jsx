import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthProvider';


const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    // base url
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000'
    })

    // request interceptor
    axiosSecure.interceptors.request.use((config) => {

        const token = localStorage.getItem('chromaCraft-access-token')

        config.headers.authorization = `Bearer ${token}`;

        return config;

    }, (error) => {

        return Promise.reject(error);
    });


    // response interceptor
    axiosSecure.interceptors.response.use((response) => {

        return response;

    }, async (error) => {

        const status = error.response.status;

        if (status === 401 || status === 403) {
            await logout()
                .then(result => {
                    console.log(result);
                    navigate('/login');
                })
                .catch(error => {
                    console.log(error);
                })
        }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;