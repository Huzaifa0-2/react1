import { useState } from 'react'
import Button from './Button'

function App() {
  const [color, setColor] = useState("olive")

  function setClr(clr) {
    setColor(clr)
  }
  function setClr2() {
    setColor("black")
  }
  return (
    <div className='w-full h-screen duration-500' style={{ background: color }}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='fixed flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-xl'>

          {/* using Buttons in 4 ways */}
          {/* 1 */}
          <button onClick={() => setColor("purple")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ background: "purple" }}>Purple</button>

          {/* 2 using Button through props */}
          <Button onClick={() => setClr("wheat")} clr={color} userName="wheat" btnClr="wheat"/>

          {/* 3  */}
          <button onClick={setClr2} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ background: "black" }}>Black</button>

          {/* 4 */}
          <button onClick={() => setClr("red")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ background: "red" }}>Red</button>
          <button onClick={() => setClr("lavender")} className='outline-none px-4 py-1 rounded-full text-black shadow-lg' style={{ background: "lavender" }}>Lavender</button>
          <button onClick={() => setClr("pink")} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{ background: "pink" }}>Pink</button>
        </div>
      </div>
    </div>
  )
}

export default App