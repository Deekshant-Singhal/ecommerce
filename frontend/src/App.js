import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import { ShopCat } from './Pages/ShopCat';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Login } from './Pages/Login';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <Routes >
        <Route path='/' element={<Shop />} />
        <Route path='/men' element={<ShopCat category='men'/>} />
        <Route path='/women' element={<ShopCat category='women'/>} />
        <Route path='/kid' element={<ShopCat category='kid'/>} />
     
          <Route path='/product' element={<Product />} >
          <Route path=':/productId' element={<Product />} />
        </Route>

        <Route path='/loginsignup' element={<Login />} />
      
      </Routes>
     </BrowserRouter> 
      
    </div>
  )
}

export default App;
