import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AxiosConfig = () => {
    const auth = useAuth()

    const axiosJWT = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });

    axiosJWT.interceptors.request.use(async (config) => {
        let currentDate = new Date()
        if (!auth?.token || auth?.expire * 1000 < currentDate.getTime()) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/token`,{withCredentials:true})
            const newToken = response.data.accessToken
            config.headers["x-access-token"] = newToken
        }
        else{
            if(!config.headers["x-access-token"]){
                config.headers["x-access-token"] = auth?.token
            }
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    })
    return axiosJWT

}

export default AxiosConfig

