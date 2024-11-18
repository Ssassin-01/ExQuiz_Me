import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from './components/User/UserContext';

import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import StudySection from "./components/StudySection";
import MakeComponent from "./components/MakeComponent";
import SubScribe from "./components/subScribe/SubScribe";
import MyPage from "./components/myPage/MyPage";
import Learning from "./components/card/Learning/Learning";
import WordLearn from "./components/card/Learning/WordLearn";
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
import LearningTest from "./components/card/LearningTest/LearningTest";
import SuccessPage from "./components/subScribe/components/SuccessPage";
import FailPage from "./components/subScribe/components/FailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LearningTestResult from "./components/card/LearningTest/LearningTestResult";
import Practice from "./components/card/Practice/PracticeOptions";
import PracticeSubjective from "./components/card/Practice/PracticeSubjective";
import PracticeOptions from "./components/card/Practice/PracticeOptions";
import PracticeMultiple from "./components/card/Practice/PracticeMultiple";
import EditComponent from "./components/card/EditComponent";
import {MainFooter} from "./components/MainFooter";
import LearningContainer from "./components/utility/LearningContainer";
import ReportPage from "./components/card/Learning/ReportPage";
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
                                    <Route index element={<Main />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="signup" element={<SignUp />} />

                                    <Route path="footer" element={<MainFooter />} />
                                    <Route path="study" element={<ProtectedRoute><StudySection /></ProtectedRoute>} />
                                    <Route path="make" element={<ProtectedRoute><MakeComponent /></ProtectedRoute>} />
                                    <Route path="game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
                                    <Route path="subscribe" element={<ProtectedRoute><SubScribe /></ProtectedRoute>} />
                                    <Route path="mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
                                    <Route path="learning/:cardNumber/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />

                                    <Route path="/edit-card/:cardNumber" element={<EditComponent />} />
                                    <Route path="/success" element={<SuccessPage />} />
                                    <Route path="/fail" element={<FailPage />} />
                                    <Route path="/edit-profile" element={<EditProfile />} />

                                    <Route path="learning" element={<LearningContainer />}>
                                        <Route path=":cardNumber" element={<Learning />} />
                                        <Route path="word-learn" element={<WordLearn />} />
                                        <Route path="practice-options" element={<PracticeOptions />} />
                                        <Route path="practice-subjective" element={<PracticeSubjective />} />
                                        <Route path="practice-multiple" element={<PracticeMultiple />} />
                                        <Route path="learn-test" element={<LearningTest />} />
                                        <Route path="learn-test-result" element={<LearningTestResult />} />
                                    </Route>
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
            <main className="main-content">
                <Header />
                <Outlet />

            </main>
        </div>
    );
}

export default App;
