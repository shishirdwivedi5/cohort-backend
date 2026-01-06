import { useState } from 'react'
import FaceExpression from "./components/FaceExpression"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  

  return (
    <>
    <ToastContainer />
   <FaceExpression />
    </>
  )
}

export default App
