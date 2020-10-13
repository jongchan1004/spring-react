import React from 'react'
import Header from './comp/Header'
import Footer from './comp/Footer'
import './App.scss'
import Content from './views/Content'
import { FocusStyleManager } from '@blueprintjs/core'
import CartComp from './comp/CartComp'
 
FocusStyleManager.onlyShowFocusOnTabs()


function App() {
  return (
    <>
    <div id="index">
    <div id="app">
      <div id="main">
      <Header />
      <Content />
      <Footer />
      </div>
    </div>
    <div id="cart" className="display-on">
      <CartComp />
    </div>
    </div>
    
    </>
  )
}


export default App