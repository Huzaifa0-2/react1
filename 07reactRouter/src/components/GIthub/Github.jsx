import React, { use, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

const Github = () => {
    // const [username, setUsername] = useState('');
    // const {user} = useParams();
    // const navigate = useNavigate();
    // using loader that loads the data as we hover the link or component
    const data = useLoaderData();

    // console.log(data);

    // const [data, setData] = useState([])



    return (

            <div className='text-center m-4 bg-gray-600 p-3 text-3xl text-center text-white'>
                Github Followers: {data.following}
                <img src={data.avatar_url} alt="Git picture" width={300} />
            </div>
    )
}

export default Github


export const githubInfoLoader = async () => {
    const respone = await fetch(`https://api.github.com/users/huzaifa0-2`);
    return respone.json();
}