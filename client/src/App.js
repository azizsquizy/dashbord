import React, { useState } from 'react'
import "./App.css"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SideBar from 'components/sidebar/SideBar'
import Header from 'components/header/Header'
import Dashboard from 'pages/Dashboard/Dashboard'
import Product from 'pages/Product/Product'
import Custmoers from 'pages/Customers/Custmoers'
import Transactions from 'pages/Transactions/Transactions'
import Geography from 'pages/Geography/Geography'
import Overview from 'pages/Overview/Overview'
import Daily from 'pages/Daily/Daily'
import Monthly from 'pages/Monthly/Monthly'
import Admin from 'pages/Admin/Admin'
import Breakdown from 'pages/Breakdown/Breakdown'
import Performance from 'pages/Performance/Performance'
const App = () => {
  const [sidebar,setSidebar] = useState(false)
  const handleState =(state)=>{
        setSidebar(state)
  }
  return (
    <div className='app'>
        <BrowserRouter>

         {sidebar&&<SideBar/>}
          <div className='pages'>
              <Header onSidebar={handleState}/>
              <Routes>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/products' element={<Product/>}/>
                  <Route path='/customers' element={<Custmoers/>}/>
                  <Route path='/transactions' element={<Transactions/>}/>
                  <Route path='/geography' element={<Geography/>}/>
                  <Route path='/overview' element={<Overview/>}/>
                  <Route path='/daily' element={<Daily/>}/>
                  <Route path='/monthly' element={<Monthly/>}/>
                  <Route path='/breakdown' element={<Breakdown/>}/>
                  <Route path='/admin' element={<Admin/>}/>
                  <Route path='/performance' element={<Performance/>}/>
              </Routes>
          </div>
          
        </BrowserRouter>
    </div>
  )
}

export default App