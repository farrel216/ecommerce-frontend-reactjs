import { useState, createContext, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AxiosConfig from "../config/AxiosConfig";


const CartContext = createContext();

function CartProvider({children}){
    const cart = useCartProvider();
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext);

const useCartProvider = () => {
    const axiosJWT = AxiosConfig()
    const [items, setItems] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  
  const getCart = async () => {
    axiosJWT.get(`${process.env.REACT_APP_API_URL}/cart`).then((response) => {
      setTotalPrice(response.data.data.totalPrice)
      setTotalItems(response.data.data.totalItems)
      setItems(response.data.data.items)
      setIsEmpty(false)
    }).catch((error) => {
        console.log(error)
    })
  }

  const emptyCart = async () => {
    await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/cart`).then(() => {
      setItems([])
      setTotalPrice(0)
      setTotalItems(0)
      setIsEmpty(true)
    }).catch((err)=> {
      console.log(err)
    })
  }

  const addItemToCart = async(item) => {
    await axiosJWT.post(`${process.env.REACT_APP_API_URL}/cart`, item).then(() => {
      getCart()
    }).catch((err)=>{
      console.log(err)
    })
  }
    return { items, totalPrice, totalItems, isEmpty, getCart, addItemToCart,emptyCart };
}

export { CartProvider, useCart };