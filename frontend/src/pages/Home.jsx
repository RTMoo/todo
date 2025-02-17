import React from 'react';

const Home = () => {
    const email = localStorage.getItem('email');
    return (
        <div>{email}</div>
    )
}

export default Home;
