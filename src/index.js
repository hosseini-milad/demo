import React,{StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './css/App.css';import './css/font-awesome.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Layout from './Components/Layout';
import Order from './pages/Order';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Quality from './pages/Quality';
import Stock from './pages/Stock';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Manage from './pages/Manage';
import ManagerHolder from './Manage/managerHolder';
import Customer from './pages/Customer';
import PrintArea from './OrderPage/OrderModules/PrintArea';
import OptionPage from './Manage/options/OptionPage';
import ProductEdit from './Manage/options/ProductEdit';
import Soon from './pages/Soon';
import OrderStatus from './OrderPage/OrderModules/OrderStatus';
import StockEdit from './pages/StockEdit';
import FishPrint from './OrderPage/OrderModules/fishPrint';
import PrintHesabfa from './OrderPage/OrderModules/PrintHesabfa';
import FishPrintHesabfa from './OrderPage/OrderModules/FishPrintHesabfa';
import PrintMultiple from './OrderPage/OrderModules/PrintMultiple';
import PrintGurantee from './OrderPage/OrderModules/printGurantee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Layout>
      <Router>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order/rx" element={<Order/>}/>
        <Route path="/order/stock" element={<Stock/>/*<Soon/>*/}/>
        <Route path="/status/:orderId" element={<OrderStatus/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/stock-edit/:stockId" element={<StockEdit/>}/>
        
        <Route path="/product/:title" element={<Product/>}/>
        <Route path="/customer/:user" element={<Customer/>}/>

        <Route path="/manage" element={<Manage/>}/>
        <Route path="/manager" element={<ManagerHolder/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blog/:post" element={<BlogPost/>}/>


        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/quality" element={<Quality/>}/>
        <Route path="/setting/:optionId" element={<OptionPage/>} />
        <Route path="/edit-product/:optionId" element={<ProductEdit/>} />
        <Route path="/print/:orderId" element={<PrintArea/>}/>
        <Route path="/printmultiple/:orderId" element={<PrintMultiple/>}/>

        <Route path="/fishprint/:orderId" element={<FishPrint/>}/>
        <Route path="/hesabprint/:orderId" element={<PrintHesabfa/>}/>
        <Route path="/hesabfishprint/:orderId" element={<FishPrintHesabfa/>}/>
        <Route path="/print-guarantee/:orderId" element={<PrintGurantee/>}/>
       </Routes>
     </Router>
    </Layout>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
