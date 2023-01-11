import CardProduct from "../component/CardProduct"
import CarouselProduct from "../component/CarouselProduct"
const LandingPage = () => {
    
    return (
        <div>
            <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Landing Page</h1>
            <div className="container max-w-full lg:max-w-screen-xl mx-auto px-4">

                <div className="">
                    <CarouselProduct />
                </div>
                <div className="container bg-gray-300 mt-5 p-5 max-w-full mx-auto">
                    <h3 className="text-left text-xl font-bold font-mono  leading-none mb-5">Produk Pilihan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CardProduct name="Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport" price="9999" id="1"/>
                            <CardProduct  name="Apple Watch Series 4 GPS, Aluminium Case, Starlight Sport" price="9999" id="2"/>
                            <CardProduct name="Apple Watch Series 2 GPS, Aluminium Case, Starlight Sport" price="9999" id="3"/>
                            <CardProduct name="Apple Watch Series 1 GPS, Aluminium Case, Starlight Sport" price="9999" id="4"/>
                            <CardProduct name="Apple Watch Series 6 GPS, Aluminium Case, Starlight Sport" price="9999" id="5"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage