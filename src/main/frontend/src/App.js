import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './components/User/UserContext';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudySection from "./components/StudySection";
import MakeComponent from "./components/MakeComponent";
import MyComponent from './components/MyComponent';
import SubScribe from "./components/SubScribe";
import Game from "./components/Game";
import "./App.css";
import MyPage from "./components/MyPage";
import Learning from "./components/Learning";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WordLearn from "./components/card/WordLearn";
import Settings from "./components/Settings";



function App() {

    return (
        <>
            <HelmetProvider>
                <div>
                    <MyComponent />
                </div>
            </HelmetProvider>
            <UserProvider>
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
                                <Route path="/game" element={<Game/>}/>
                                <Route path="/subscribe" element={<SubScribe/>}/>
                                <Route path="/profile" element={<MyPage/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/learn" element={<Learning/>}/>
                                <Route path="/wordLearn" element={<WordLearn/>}/>

                            </Routes>
                        </main>
                    </div>
                </div>
            </Router>
            </UserProvider>
        </>
    );
}

export default App;