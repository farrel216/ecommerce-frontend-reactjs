import { Navbar, Dropdown, Avatar} from "flowbite-react"
import { useAuth } from '../context/AuthContext'
import profile from '../assets/placeholder/profile-photo.jpeg'
import { useNavigate } from "react-router"
import axios from "axios"
import { useEffect, useState } from "react"
import {FaShoppingCart} from 'react-icons/fa'
import AxiosConfig from "../config/AxiosConfig";
import { useCart } from "react-use-cart"


const Navigation = ({ isLogin }) => {
    const auth = useAuth()
    const navigate = useNavigate()
    const pathname = window.location.pathname
    const [name,setName] = useState("")
    const [category,setCategory] = useState([])
    const [email,setEmail] = useState("")
    const {totalItems} = useCart()
    
    const axiosJWT = AxiosConfig()
    const logoutHandler = async () => {
        try {
            await auth.logout()
            navigate('/login')
            
        } catch (error) {
            console.log(error)
        }
    }
    const getUserData = async () => {
        try {
            const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/users/${auth.id}`,{withCredentials:true})
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
    const getCategory = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products/categories')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if(auth.isLogin){
        const getUser = async () => {
            await auth.getToken()
            const category = await getCategory()
            const response = await getUserData()
            setCategory(category)
            setEmail(response.email)
            setName(response.name)
        }
        getUser()
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.isLogin])
    

    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="/home">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    E-Commerce
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {isLogin ? (
                    <>
                    <div className="mr-4 inline">
                        <a href="/cart">
                        <div>

                        <FaShoppingCart/>
                        </div>
                        <div>
                        <span>{totalItems}</span>

                        </div>
                        </a>
                    </div>
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={profile} rounded={true} />}
                        >
                        <Dropdown.Header>
                            <span className="block text-sm">
                               {name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <button onClick={() => { logoutHandler() }}>Sign Out</button>
                        </Dropdown.Item>
                    </Dropdown>
                </>
                ) : (<div className="hidden md:flex ">
                    <div className="grid grid-cols-2 gap-2">
                        <a href="/login" className="btn text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Login</a>
                        <a href="/register" className="btn focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Register
                        </a>
                    </div></div>
                )}
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link active={pathname === "/home"}
                    href="/home"
                    >
                    Home
                </Navbar.Link>
                <Dropdown arrowIcon={true}
                        inline={true}
                        label={"Category"}>
                            {category.map((item,index) => {
                                return (
                                    <Dropdown.Item key={index}>
                                        <a href={`/category/${item}`}>{item}</a>
                                    </Dropdown.Item>
                                )
                            })}
                </Dropdown>
                <Navbar.Link className={isLogin ? ('hidden') : ("md:hidden")} href="/login">
                    Login
                </Navbar.Link>
                <Navbar.Link className={isLogin ? ('hidden') : ("md:hidden")} href="/register">
                    Register
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation