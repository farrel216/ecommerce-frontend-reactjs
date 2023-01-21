import { useState, createContext, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AxiosConfig from "../config/AxiosConfig";


const AuthContext = createContext();

function AuthProvider({children}){
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

const useAuthProvider = () => {
    const axiosJWT = AxiosConfig()
    const [token, setToken] = useState(null);
    const [expire, setExpire] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState();
    const [name, setName] = useState()


    const getToken = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/token`,{withCredentials:true})
          setToken(response.data.accessToken)
          const decoded = jwtDecode(response.data.accessToken)
          setExpire(decoded.exp)
          setIsLogin(true)
          return response.data.accessToken
        } catch (error) {
          return false
        }
    }
    const logout = async() =>{
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/auth/logout`,{withCredentials:true})
          setName("")
          setEmail("")
          setToken("")
          setExpire("")
          setIsLogin(false)
        } catch (error) {
          console.log(error)
        }
      }
      const getUserData = async () => {
        try {
            const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/users`,{withCredentials:true})
            setName(response.data.data.name)
            setEmail(response.data.data.email)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }

    return { isLogin, token, expire, name, email, getToken, logout, getUserData};
}

export { AuthProvider, useAuth };