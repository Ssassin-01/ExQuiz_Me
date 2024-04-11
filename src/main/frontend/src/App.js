// src/main/frontend/src/App.js
import React from 'react';
//import React, {useEffect, useState} from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import StudySection from "./components/StudySection";
import MakeComponent from "./components/MakeComponent";

function App() {
  /*const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);*/

    return (
        <Router>
            <div className="app">
                <Header />
                <div className="content">
                    <Sidebar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/study" element={<StudySection />} />
                            <Route path="/make" element={<MakeComponent />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;