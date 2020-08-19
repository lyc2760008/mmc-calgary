import React from 'react'
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const LoginFirst = () => {
    return (
        <>
        <NavBar />
        <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p>Please Log in first to get detailed information...</p>
            <a href="/login">Go to Login page</a>
        </div>
        </>
    )
}

export default LoginFirst
