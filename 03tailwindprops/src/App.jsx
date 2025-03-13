import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-red-400'>Chai or React</h1>
      <Card username="Huzaifa" newName="Riaz"/>
      <Card username="Shafaq" newName="Riaz"/>
      <Card username="Hurain" newName="Riaz"/>
      <Card username="Hifza" newName="Riaz"/>
    </>
  )
}

export default App
