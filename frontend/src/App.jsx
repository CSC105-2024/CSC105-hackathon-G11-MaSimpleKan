import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./assets/Navbar.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}

export default App;