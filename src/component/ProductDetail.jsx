import axios from "axios"
import { Card } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import profile from "../assets/placeholder/default-image.jpg"

const ProductDetail = () => {
  const [detail, setDetail] = useState([])
  const {productId} = useParams()


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/detail/${productId}`).then((response)=>{
      setDetail(response.data.data)
      console.log(response.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])
  

    return (
        <div className="flex items-center justify-center">
            <div className="max-w-sm">
  <Card
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc={detail.image ? process.env.REACT_APP_IMAGE_URL+'/product/'+detail.image : profile}
  >
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {detail.name}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
      {detail.description}
    </p>
    <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${detail.price}
            </span>
            <a
              href={`/product/${productId}`}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add To Cart
            </a>
          </div>
  </Card>
</div>
        </div>
    )
}

export default ProductDetail