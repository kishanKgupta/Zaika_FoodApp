import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Body from './Body.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Header/>
    <Body />
    <Footer/>
  </React.StrictMode>,
)
