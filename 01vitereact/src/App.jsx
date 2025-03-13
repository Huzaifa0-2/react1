import { useState } from 'react'
import Huzaifa from './huzaifa'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Huzaifa />
      <p>You can check the console</p>
    </>
  )
}

export default App
