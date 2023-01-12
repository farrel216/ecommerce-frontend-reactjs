import { Navbar, Dropdown, Avatar, Button } from "flowbite-react"
import { useAuth } from '../context/AuthContext'
import profile from '../assets/placeholder/profile-photo.jpeg'
import { useNavigate } from "react-router"

const Navigation = ({ isLogin }) => {
    const auth = useAuth()
    const navigate = useNavigate()
    const pathname = window.location.pathname

    const logoutHandler = async () => {
        try {
            await auth.logout()
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }



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
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={profile} rounded={true} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                Bonnie Green
                            </span>
                            <span className="block truncate text-sm font-medium">
                                name@flowbite.com
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
                ) : (<div className="hidden md:flex ">
                    <div className="grid grid-cols-2 gap-2">
                        <button className="text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Login</button>
                        <Button color="success">
                            Register
                        </Button>
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
                <Navbar.Link
                    active={pathname === "/category/jewelery"}
                    href="/category/jewelery">
                    Jewelery
                </Navbar.Link>
                <Navbar.Link
                    active={pathname === "/category/electronics"}
                    href="/category/electronics">
                    Electronics
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
                <Navbar.Link className={isLogin ? ('hidden') : ("md:hidden")} href="/navbars">
                    Login
                </Navbar.Link>
                <Navbar.Link className={isLogin ? ('hidden') : ("md:hidden")} href="/navbars">
                    Register
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation