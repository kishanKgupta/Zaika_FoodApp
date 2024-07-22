import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.jsx'
import Body from './Body.jsx'
import Footer from './Footer.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Body />
    <Footer/>
  </React.StrictMode>,
)
