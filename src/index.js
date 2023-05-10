import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import md5 from 'md5';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.timeout = 5000;
axios.defaults.params = {};

axios.interceptors.request.use((config) => {
    const time = Number(new Date());
    const hash = md5(time + `${process.env.REACT_APP_API_PRIVATE_KEY}` + `${process.env.REACT_APP_API_PUBLIC_KEY}`);
    config.params.apikey = process.env.REACT_APP_API_PUBLIC_KEY;
    config.params.hash = hash;
    config.params.ts = time;
    return config;

}, (error) => {
    return Promise.reject(error);
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
