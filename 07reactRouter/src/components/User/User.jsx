import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userid} = useParams()
    return (
    <div className='bg-gray-600 p-3 text-3xl text-center text-white'>User: {userid}</div>
  )
}

export default User