import Verify from './Pages/verification/verify'

import Navbar from './Components/Navbar'

import { Route, Routes } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/verification' element={<Verify/>}/>
      </Routes>
    </>
  )
}

export default App