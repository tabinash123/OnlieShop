import React from 'react'
import Admin from './Pages/Admin/Admin'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Admin />
    </div>
  )
}

export default App