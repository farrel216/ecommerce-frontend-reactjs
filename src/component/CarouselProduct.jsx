import axios from "axios";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import profile from "../assets/placeholder/default-image.jpg"

const CarouselProduct = (products) => {
  const [carousel, setCaraousel] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api`).then((response)=>{
      setCaraousel(response.data.data)
      console.log(response.data.data)
    })
  }, [products])
  
    
    return(
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={5000}>
          {carousel.map((item) => {
            return(
              <img key={item._id}
                    alt={item.name}
                    src={item.image ? process.env.REACT_APP_IMAGE_URL+'/product/'+item.image : profile}
                  />
            )
          })

          }
       
    
  </Carousel>
        </div>
    )
}

export default CarouselProduct