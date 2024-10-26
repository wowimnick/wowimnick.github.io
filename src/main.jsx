import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css';

const isSmallScreen = window.matchMedia('(max-width: 768px)').matches

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App isSmallScreen={isSmallScreen} />
  </React.StrictMode>,
)