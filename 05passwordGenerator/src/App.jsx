import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowd, setNumberAllowd] = useState(true)
  const [charAllowd, setCharAllowd] = useState(true)
  const [password, setPassword] = useState("")
  const [name, setName] = useState("copy")

  
  // useRef is used for getting reference of anything
  const passwordRef = useRef(null)


  // This is for generating 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowd) str += "0123456789"
    if (charAllowd) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = str.charAt(Math.floor(Math.random() * str.length + 1))
      pass += char;
    }
    setPassword(pass);
  }, [length, numberAllowd, charAllowd, setPassword])// Why using setPassword here (Hitesh said it is for optimization memoization cache useCallBack)?

  function copyPasswordToClipboard() {
    window.navigator.clipboard.writeText(password)
    setName("copied");
    passwordRef.current?.select();
    setTimeout(() => {
      setName("copy")
    }, 2000)
  }

  // This is for running
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowd, charAllowd, setPassword])

  return (
    <>
      <div className="w-full max-w-md text-center mx-auto shadow-md rounded-lg px-4 py-6 mt-10 my-8 bg-gray-700 text-orange-500">
        <h1 className='text-white text-xl text-center my-3'>Password Generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white text-gray-700'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-sky-500 hover:bg-sky-700 py-1 px-6 text-white cursor-pointer'>{name}</button>
        </div>
        <div className="flex text-left mb-4">
          <div className='flex items-center mr-2'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label className='ml-2 text-white'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 ml-auto">
            <input
              type="checkbox"
              defaultChecked={numberAllowd}
              id='numberInput'
              onChange={(e) => setNumberAllowd(e.target.checked)} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ml-auto">
            <input
              type="checkbox"
              defaultChecked={charAllowd}
              id='charInput'
              onChange={() => setCharAllowd((prev) => !prev)} />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
