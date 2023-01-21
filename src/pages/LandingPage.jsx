import { Helmet } from "react-helmet"
import CardProduct from "../component/CardProduct"
import CarouselProduct from "../component/CarouselProduct"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Spinner } from "flowbite-react"
const LandingPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const getProduct = async () => {
        setLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/product`)
        setProducts(response.data.data)
        console.log(response)
        setLoading(false)
    }
    // const getProduct = async () => {
        //     setLoading(true)
        //     const response = await axios.get(`https://fakestoreapi.com/products`)
        //     setProducts(response.data)
        //     setLoading(false)
        // }
    useEffect(() => {
        getProduct()
    }, [])
        

    return (
        <>
            {loading ? (<div className='h-screen flex items-center justify-center'><Spinner
                aria-label="Extra large spinner example"
                size="xl"
            /></div>

            ) : (

                <div>
                    <Helmet>
                        <title>Landing Page</title>
                    </Helmet>
                    <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Landing Page</h1>
                    <div className="container max-w-full lg:max-w-screen-xl mx-auto px-4">

                        <div className="">
                            <CarouselProduct products={products} />
                        </div>
                        <div className="bg-gray-300 mt-5 p-5 max-w-full mx-auto">
                            <h3 className="text-center text-xl font-bold font-mono  leading-none mb-5">Produk Pilihan</h3>
                            <div className="container mx-auto flex flex-wrap justify-center gap-6">
                                {products.map((product) => {
                                    return (
                                        <CardProduct key={product._id} name={product.title} price={product.price} id={product._id} rate={product.rating[0].rate} image={product.image} category={product.category.name} />
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

export default LandingPage