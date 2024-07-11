import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar/Navbar';
import Footer from './common/Footer/Footer';
import ScrollToTop from "react-scroll-to-top";
import { TbCircleArrowUp } from 'react-icons/tb';

function App() {

  return (
    <>
      <Navbar></Navbar>
      <br /><br />
      <Outlet></Outlet>
      <br /><br />
      <Footer></Footer>
      <ScrollToTop
        smooth
        className='tooltip tooltip-bottom animate-bounce'
        data-tip='Back to Top'
        component={<TbCircleArrowUp className='mx-auto my-auto text-3xl' />}
      />
    </>
  )
}

export default App
