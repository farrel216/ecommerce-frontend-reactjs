import { Helmet } from "react-helmet"
import CardProduct from "../component/CardProduct"
import CarouselProduct from "../component/CarouselProduct"
import axios from 'axios'
import { useEffect, useState } from "react"
const LandingPage = () => {
    const [products, setProducts] = useState([])

    const getProduct = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api`)
        setProducts(response.data.data)
    }

    useEffect(() => {
        console.log(products)
        }, [products])
    useEffect(() => {
        getProduct()
    },[])


    return (
        <div>
            <Helmet>
                <title>Landing Page</title>
            </Helmet>
            <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Landing Page</h1>
            <div className="container max-w-full lg:max-w-screen-xl mx-auto px-4">

                <div className="">
                    <CarouselProduct products={products}/>
                </div>
                <div className="container bg-gray-300 mt-5 p-5 max-w-full mx-auto">
                    <h3 className="text-left text-xl font-bold font-mono  leading-none mb-5">Produk Pilihan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product)=>{
                            return (
                                <CardProduct key={product._id} name={product.name} price={product.price} id={product._id} image={product.image}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage