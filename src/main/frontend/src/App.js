// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get('/api/data')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
  }, []);

    return (
        <>
            {/*<div>*/}
            {/*    받아온 값 :{data}*/}
            {/*</div>*/}
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