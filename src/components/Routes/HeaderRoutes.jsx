import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from '../../pages/Nav/Nav'

import NoPage from '../../pages/NoPage/NoPage'
import Homepage from '../../pages/Home/Homepage'



// header routing
const HeaderRoutes = () => {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </>
    </Router>
  )
}

export default HeaderRoutes


