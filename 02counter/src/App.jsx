import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [title, setTitle] = useState("Initialize Counter");
  let [counter, setCounter] = useState(0);

  function addValue () {
    // let counter;
    setTitle("Counter", counter);
    setCounter(counter + 1);
  }

  const removeValue = () => {

    if (counter == 0) {
      alert("Counter cannot be less than 0");
    }
    else {
      setCounter(counter - 1);
    }
  }

  return (
  <>
    <h1>Chai or React</h1>
    <h2>{title} {counter}</h2>

    <button onClick={addValue}>Add Value</button>
    <br/>
    <br/>
    <button onClick={removeValue}>Subtract Value</button>
  </>
  )
}

export default App
