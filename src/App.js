import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Navigation from './component/Navigation';
import ProductDetail from './component/ProductDetail';
import Register from './pages/Register';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    
  },[isLogin])
  
  return (
    <>
        {isLogin ? 
        <div className='h-screen'>
          <Navigation/>
          <section>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<LandingPage/>}/> 
        <Route path='/product/:productId' element={<ProductDetail/>}/>
        <Route path='*' element={<LandingPage/>}/>        
      </Routes>
          </section>
        </div>
        : 
        <Routes>
        <Route path='/' element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
        <Route path='/register' element={<Register isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
        <Route path='*' element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>}/> 
      </Routes>
      }

    </>
  );
}

export default App;
