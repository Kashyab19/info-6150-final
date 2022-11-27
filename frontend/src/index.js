import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//External
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

//NPMs
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Pages
import AddProducts from './pages/AddProducts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route exact={true} path="/" element={<App />} />
    <Route exact={true} path="/add-products" element={<AddProducts/>} />
</Routes>
</BrowserRouter>
);

