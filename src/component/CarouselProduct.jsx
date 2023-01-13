import axios from "axios";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import placeholdImg from "../assets/placeholder/default-image.jpg"
import { Spinner } from "flowbite-react";

const CarouselProduct = (products) => {
  const [carousel, setCaraousel] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/product`).then((response)=>{
  //     setCaraousel(response.data.data)
  //     console.log(response.data.data)
  //   })
  // }, [products])
  useEffect(() => {
    setLoading(true)
    axios.get(`https://fakestoreapi.com/products?limit=5`).then((response) => {
      setCaraousel(response.data)
      setLoading(false)
    })
  }, [products])


  return (
    <>
      {loading ? (<div className='h-screen flex items-center justify-center'><Spinner /></div>) : (

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={5000}>
            {carousel.map((item) => {
              return (
                <img key={item.id}
                  height="100px"
                  alt={item.title}
                  src={item.image ? item.image : placeholdImg}
                />
              )
            })

            }


          </Carousel>
        </div>
      )}
    </>
  )
}

export default CarouselProduct