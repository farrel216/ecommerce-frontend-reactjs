import { Helmet } from "react-helmet"
import CardProduct from "../component/CardProduct"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Spinner } from "flowbite-react"
import { useParams } from "react-router"
const CategoryPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {category} = useParams()

    // const getProduct = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/product`)
    //     setProducts(response.data.data)
    // }
    // useEffect(() => {
    //     getProduct()
    // }, [])
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
            setProducts(response.data)
            setLoading(false)
        }
        getProduct()
    }, [category])


    return (
        <>
            {loading ? (<div className='h-screen flex items-center justify-center'><Spinner
                aria-label="Extra large spinner example"
                size="xl"
            /></div>

            ) : (

                <div>
                    <Helmet>
                        <title>Category Page</title>
                    </Helmet>
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Category Page</h1>
                    <div className="container max-w-full lg:max-w-screen-xl mx-auto px-4">
                        <div className="bg-gray-300 mt-5 p-5 max-w-full mx-auto">
                            <h3 className="text-center text-xl font-bold font-mono  leading-none mb-5">{category}</h3>
                            <div className="container mx-auto flex flex-wrap justify-start gap-6">
                                {products.map((product) => {
                                    return (
                                        <CardProduct key={product.id} name={product.title} price={product.price} id={product.id} rate={product.rating.rate} image={product.image} category={product.category} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default CategoryPage