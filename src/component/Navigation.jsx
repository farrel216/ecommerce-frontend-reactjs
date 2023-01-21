import { Navbar, Dropdown, Avatar, Spinner} from "flowbite-react"
import { useAuth } from '../context/AuthContext'
import profile from '../assets/placeholder/profile-photo.jpeg'
import { useNavigate } from "react-router"
import axios from "axios"
import { useEffect, useState } from "react"
import {FaShoppingCart, FaSearch} from 'react-icons/fa'
import { useCart } from "../context/CartContext"
import AxiosConfig from "../config/AxiosConfig"


const Navigation = ({ isLogin }) => {
    const auth = useAuth()
    const cart = useCart()
    const navigate = useNavigate()
    const axiosJWT = AxiosConfig()
    const pathname = window.location.pathname
    const [loading,setLoading] = useState(true)
    const [category,setCategory] = useState([])
    const [cartTotal, setCartTotal] = useState()
    
    const logoutHandler = async () => {
        try {
            await auth.logout()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    
    const getCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`)
            setCategory(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setCartTotal(cart.totalItems)
    },[cart.totalItems])
    
    useEffect(() => {
        setLoading(true)
        getCategory()
        setLoading(false)
    }, [])
    

    return (
        <>
        {loading ? (<div className='h-screen flex items-center justify-center'><Spinner
                aria-label="Extra large spinner example"
                size="xl"
            /></div>

            ) : (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <div className="flex items-center">
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
            </div>
            <Navbar.Toggle/>
            <Navbar.Collapse className="ml-4">
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
                                        <a href={`/category/${item.name}`}>{item.name}</a>
                                    </Dropdown.Item>
                                )
                            })}
                </Dropdown>
                <Navbar.Link>

                </Navbar.Link>
                <Navbar.Link className={isLogin ? ('hidden') : ("md:hidden")} href="/login">
                    Login
                </Navbar.Link>
                <Navbar.Link className={isLogin ? ('hidden') : ("md:hidden")} href="/register">
                    Register
                </Navbar.Link>
            </Navbar.Collapse>
            <div className="relative mx-auto text-gray-600 lg:block hidden">
                <input className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none" type="text" />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-2"><FaSearch/></button>
            </div>

            {isLogin ? (
                    <div className="flex md:order-2">
                    <div className="mr-4 inline">
                        <a href="/cart">
                        <div>

                        <FaShoppingCart/>
                        </div>
                        <div>
                        <span>{cartTotal}</span>

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
                               {auth.name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {auth.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            <a href="/home">
                                
                                Dashboard
                                </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a href="/profile">Settings</a>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <button onClick={ () => { logoutHandler() }}>Sign Out</button>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                ) : (<div className="hidden md:flex ">
                    <div className="grid grid-cols-2 gap-2">
                        <a href="/login" className="btn text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Login</a>
                        <a href="/register" className="btn focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Register
                        </a>
                    </div></div>
                )}
        </Navbar>)}
        </>
    )
}

export default Navigation