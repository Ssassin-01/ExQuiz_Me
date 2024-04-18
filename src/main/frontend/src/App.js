// src/main/frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import StudySection from "./components/StudySection";
import MakeComponent from "./components/MakeComponent";
import MyComponent from './components/MyComponent';

function App() {


    return (
        <>
            <HelmetProvider>
                <div>
                    <MyComponent />
                </div>
            </HelmetProvider>
            <Router>
                <div className="app">

                    <div className="content">
                        <Sidebar/>
                        <main className="main-content">
                            <Header/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/signup" element={<SignUp/>}/>
                                <Route path="/study" element={<StudySection/>}/>
                                <Route path="/make" element={<MakeComponent/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;