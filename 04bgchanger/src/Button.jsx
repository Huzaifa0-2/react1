import React from 'react'

const Button = ({clr, onClick, btnClr, userName}) => {
  return (

        <button className='outline-none px-4 py-1 rounded-full text-black shadow-lg' onClick={onClick} style={{backgroundColor: btnClr}}>{userName}</button>

  )
}

export default Button