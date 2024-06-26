import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './components/User/UserContext';

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudySection from "./components/StudySection";
import MakeComponent from "./components/MakeComponent";
import SubScribe from "./components/SubScribe";
import MyPage from "./components/MyPage";
import Learning from "./components/Learning";
import WordLearn from "./components/card/WordLearn";
import Settings from "./components/Settings";
import Game from "./components/game/Game";
import GameRoom from "./components/game/GameRoom";
import Gaming from "./components/game/Gaming";
import GameOX from "./components/game/GameOX";
import { WebSocketProvider } from './components/game/context/WebSocketContext';
import { NicknameProvider } from './components/game/context/NicknameContext';

import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
    return (
        <HelmetProvider>
            <UserProvider>
                <WebSocketProvider>
                    <NicknameProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={<LayoutWithSidebar />}>
                                    <Route index element={<Home />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="signup" element={<SignUp />} />
                                    <Route path="study" element={<StudySection />} />
                                    <Route path="make" element={<MakeComponent />} />
                                    <Route path="game" element={<Game />} />
                                    <Route path="subscribe" element={<SubScribe />} />
                                    <Route path="profile" element={<MyPage />} />
                                    <Route path="settings" element={<Settings />} />
                                    <Route path="learn" element={<Learning />} />
                                    <Route path="/word-learn" element={<WordLearn />} /> {/* WordLearn 경로 추가 */}
                                </Route>
                                <Route path="gameroom" element={<GameRoom />} />
                                <Route path="gaming" element={<Gaming />} />
                                <Route path="gameox" element={<GameOX />} />
                            </Routes>
                        </Router>
                    </NicknameProvider>
                </WebSocketProvider>
            </UserProvider>
        </HelmetProvider>
    );
}

function LayoutWithSidebar() {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                <Header />
                <Outlet />
            </main>
        </div>
    );
}

export default App;
