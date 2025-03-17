import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Githubsearch = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null); 

    const [searchParams, setSearchParams] = useSearchParams(); 
    const user = searchParams.get('user')

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchParams({ user: username });
    };

    useEffect(() => {
        if (user) {
            // Fetch GitHub user data
            fetch(`https://api.github.com/users/${user}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data); 
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error fetching GitHub profile:', error);
                });
        }
    }, [user]);

    return (
        <>
<h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Search GitHub IDs</h1>
<form onSubmit={handleSubmit} className="flex justify-center items-center gap-4 mb-8">
  <input
    type="text"
    placeholder="Enter GitHub username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
  />
  <button
    type="submit"
    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
  >
    Go
  </button>
</form>

{userData && (
  <div className="text-center m-4 bg-gray-800 p-6 rounded-lg shadow-lg">
    <p className="text-2xl font-semibold text-white mb-4">
      GitHub Followers: <span className="text-blue-400">{userData.followers}</span>
    </p>
    <img
      src={userData.avatar_url}
      alt="GitHub Profile"
      className="rounded-full w-48 h-48 mx-auto border-4 border-blue-500 shadow-lg"
    />
  </div>
)}
        </>
    );
};

export default Githubsearch;