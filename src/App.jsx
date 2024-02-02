import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Common/Navbar/Navbar'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  )
}

export default App
