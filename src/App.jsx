import { Outlet } from 'react-router-dom'
import Navbar from './Common/Navbar/Navbar'
import Footer from './Common/Footer/Footer'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <br /><br />
      <Outlet></Outlet>
      <br /><br />
      <Footer></Footer>
    </>
  )
}

export default App
