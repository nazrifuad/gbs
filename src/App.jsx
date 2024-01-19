import React from 'react'
import './css/main.css'
import HeaderRoutes from './components/Routes/HeaderRoutes'


// main
function App({children}) {
  return (
    <main className="main-content">
      <HeaderRoutes />
      {children}
    </main>
  )
}

export default App
