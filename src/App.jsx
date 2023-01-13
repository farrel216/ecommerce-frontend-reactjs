import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Navigation from './component/Navigation';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import { Spinner } from 'flowbite-react';
import NotFoundPage from './pages/NotFoundPage';
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage';

function App() {
  const [loading, setLoading] = useState(true)
  const auth = useAuth()
  const pathname = window.location.pathname
  const navigate = useNavigate()
  useEffect(() => {
    const verify = async () => {
      setLoading(true)
      if (!auth.token) {
        const response = await auth.getToken()
        if (!response) {
          if (pathname !== '/register' && pathname !== '/login' && pathname !== '/') {
            navigate('/login')
          }
        }
      }
      setLoading(false)
    }
    verify()
  }, [auth, pathname, navigate])

  return (
    <>
      {loading ? (<div className='h-screen flex items-center justify-center'><Spinner
        aria-label="Extra large spinner example"
        size="xl"
      /></div>) : (!auth.isLogin) ? (
        (pathname !== '/register' && pathname !== '/login')?(
            <>
            <Navigation isLogin={auth.isLogin} />
            <Routes>
              <Route exact path='/' element={<LandingPage />} />
              <Route exact path='/home' element={<LandingPage />} />
              <Route path='*' element={<Login />} />
            </Routes>
            </>
        ):(
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
        )
        ) : (
        <div className='h-screen w-screen'>
          <Navigation isLogin={auth.isLogin} />
          <section>
            <Routes>
              <Route exact path='/' element={<LandingPage />} />
              <Route path='/home' element={<LandingPage />} />
              <Route path='/product/:productId' element={<ProductDetail />} />
              <Route path='/category/:category' element={<CategoryPage />} />
              <Route path='/cart' element={<CartPage/>}/>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </section>
        </div>



      )}
    </>
  );
}

export default App;
