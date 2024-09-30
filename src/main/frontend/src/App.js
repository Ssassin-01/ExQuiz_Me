import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './components/User/UserContext';

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./components/Home";
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StudySection from "./components/StudySection";
import MakeComponent from "./components/MakeComponent";
import SubScribe from "./components/subScribe/SubScribe";
import MyPage from "./components/myPage/MyPage";
import Learning from "./components/card/Learning";
import WordLearn from "./components/card/WordLearn";
import Game from "./components/game/Game";
import GameRoom from "./components/game/GameRoom";
import { WebSocketProvider } from './components/game/context/WebSocketContext';
import { NicknameProvider } from './components/game/context/NicknameContext';

import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GameTrueOrFalse from "./components/game/GameTrueOrFalse";
import GameFour from "./components/game/GameFour";
import PlayerOX from "./components/game/player/PlayerOX";
import PlayerFour from "./components/game/player/PlayerFour";
import PlayerShortAnswer from "./components/game/player/PlayerShortAnswer";
import GameShortAnswer from "./components/game/GameShortAnswer";

import EditProfile from "./components/User/EditProfile";
import TimeTracker from "./components/utility/TimeTracker";
import LearningTest from "./components/card/LearningTest";
import SuccessPage from "./components/subScribe/components/SuccessPage";
import FailPage from "./components/subScribe/components/FailPage";
function App() {
    return (
        <HelmetProvider>
            <UserProvider>
                <WebSocketProvider>
                    <NicknameProvider>
                        <Router>
                            <TimeTracker />
                            <Routes>
                                <Route path="/" element={<LayoutWithSidebar />}>
                                    {/*<Route index element={<Home />} />*/}
                                    <Route index element={<Main />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="signup" element={<SignUp />} />
                                    <Route path="study" element={<StudySection />} />
                                    <Route path="make" element={<MakeComponent />} />
                                    <Route path="game" element={<Game />} />
                                    <Route path="subscribe" element={<SubScribe />} />
                                    <Route path="/success" element={<SuccessPage />} />
                                    <Route path="/fail" element={<FailPage />} />
                                    <Route path="/mypage" element={<MyPage />} />
                                    <Route path="/edit-profile" element={<EditProfile />} />
                                    <Route path="/learning/:cardNumber" element={<Learning />} /> {/* Learning 경로 추가 */}
                                    <Route path="/word-learn" element={<WordLearn />} /> {/* WordLearn 경로 추가 */}
                                    <Route path="/learn-test" element={<LearningTest />} />
                                </Route>
                                <Route path="gameroom" element={<GameRoom />} />
                                <Route path="/player/ox" element={<PlayerOX />} /> {/* OX 플레이어 */}
                                <Route path="/player/four" element={<PlayerFour />} /> {/* 4지선다 플레이어 */}
                                <Route path="/player/short-answer" element={<PlayerShortAnswer />} /> {/* 주관식 플레이어 */}
                                <Route path="game/true-or-false" element={<GameTrueOrFalse />} /> {/* 게임화면 O / X */}
                                <Route path="game/four" element={<GameFour />} /> {/* 게임화면 4지선단 */}
                                <Route path="game/question" element={<GameShortAnswer />} /> {/* 게임화면 단답형 */}
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
