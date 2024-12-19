import './App.css'
import Navbar from "./components/Navbar"
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <div className='[background:radial-gradient(125%_125%_at_50%_10%,#DAEBE0_0%,#fff_30%,#15803D_100%)]'>
      <Manager />
      </div>
      <Footer />
    </>

  )
}

export default App
