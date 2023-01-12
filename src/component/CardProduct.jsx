import placeholdImg from "../assets/placeholder/default-image.jpg"
const CardProduct = ({ name, price, id, image, rate,category }) => {

  return (
    <div className="max-w-full mb-6 md:mb-0 w-[280px] bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div id="imageProduct">
        <a href={`/product/${id}`}>
          {/* <img className="text-center p-8 rounded-t-lg w-full h-[200px] object-contain" alt={name} src={image ? process.env.REACT_APP_IMAGE_URL+'/product/'+image : placeholdImg}/> */}
          <img className="text-center p-8 rounded-t-lg w-full h-[200px] object-contain" alt={name} src={image ? image : placeholdImg} />
        </a>
      </div>
      <div id="description" className="px-5 pb-5 block">
        <div id="title" className="text-ellipsis overflow-hidden whitespace-nowrap">
          <a href={`/product/${id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
        </div>
        <div id="detail" className="block">
          <div className="mt-2.5 mb-5 flex items-center">
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
              {rate}
            </span>
            <a href={`/category/${category}`} className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
              {category}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <a
              href={`/product/${id}`}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Detail
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CardProduct