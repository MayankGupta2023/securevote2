import React, { useState } from 'react';
import Router from 'next/router'

const Index = () => {
    // State variables to store user input
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Redirect using Router.push
        Router.push('/center/status');
    };

    return (
        <div className='flex w-full bg-blue-50 justify-center items-center h-screen'>
            <div className="container mx-auto mt-8 w-1/3">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Index;
