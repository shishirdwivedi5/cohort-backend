import { useState } from 'react'
import FaceExpressionApi from './components/faceApi'
import './index.css'
import SongPlayer from './components/song.jsx'
function App() {


  return (
    <>
      
    <FaceExpressionApi/>
    <SongPlayer/>
    </>
  )
}

export default App
