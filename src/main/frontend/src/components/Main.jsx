import React from 'react';
import './css/Main.css';
import {Link, useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const moveGame = () =>{
        navigate('game');
    }
    return (
        <div className="main-container">

            <section className="hero-section">
                <div className="hero-content">
                    <h1>📚 영단어 실력을 빠르게 향상하세요</h1>
                    <p>오늘의 학습 목표를 설정하고, 친구들과 함께 게임에 도전하세요!</p>
                    <div className="cta-buttons">
                        <Link to="/study" className="cta-button">
                            💡 학습하기
                        </Link>
                        <Link to="/make" className="cta-button">
                            🛠️ 만들기
                        </Link>
                        <Link to="/game" className="cta-button">
                            🎮 게임 시작하기
                        </Link>
                        <Link to="/subscribe" className="cta-button">
                            💳 구독하기
                        </Link>
                    </div>
                </div>
            </section>


            <section className="feature-section">
                <h2>주요 기능 설명 ✨</h2>
                <div className="feature-content">
                    <div className="feature-item">
                        <span className="feature-emoji">📖</span>
                        <h3>학습하기</h3>
                        <p>새로운 단어를 배우고, 자동으로 나만의 단어장에 저장됩니다.</p>
                    </div>
                    <div className="feature-item">
                        <span className="feature-emoji">🔁</span>
                        <h3>연습하기</h3>
                        <p>배운 단어들을 복습하여 기억을 더 오래 유지하세요.</p>
                    </div>
                    <div className="feature-item">
                        <span className="feature-emoji">✅</span>
                        <h3>테스트하기</h3>
                        <p>간단한 퀴즈로 배운 내용을 확인하고 실력을 테스트해보세요.</p>
                    </div>
                    <div className="feature-item">
                        <span className="feature-emoji">🏆</span>
                        <h3>게임하기</h3>
                        <p>친구들과 함께 단어 게임을 즐기며 학습하세요!</p>
                    </div>
                </div>
            </section>


            <section className="game-flow-section">
                <h2>게임 진행 방식 🎮</h2>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-emoji">🔧</span>
                            <h3>1. 방 설정</h3>
                            <p>방장이 로그인을 하고 방 설정을 합니다.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-emoji">📱</span>
                            <h3>2. QR코드 생성</h3>
                            <p>방만들기를 하면 QR코드가 생성됩니다.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-emoji">👥</span>
                            <h3>3. 방 접속</h3>
                            <p>다른 학생들은 스마트폰으로 QR코드를 통해 방에 접속합니다.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-emoji">✏️</span>
                            <h3>4. 게임 시작</h3>
                            <p>학생들은 닉네임을 입력하고 방장은 확인 후 게임을 시작합니다.</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="timeline-emoji">🎉</span>
                            <h3>5. 재밌는 영단어 게임 즐기기!</h3>
                            <p>친구들과 함께 영단어 지식 대결을 재밌게 즐깁니다.</p>
                        </div>
                    </div>
                </div>
                <div className="start-button">
                    <button className="cta-button start-cta" onClick={moveGame}>시작하기</button>
                </div>
            </section>


            <section className="challenge-section">
                <h2>이번 주 학습 챌린지 🔥</h2>
                <p>주간 챌린지: 100개의 단어를 외우고 상을 받아보세요! 단어 암기 훈련을 통해 실력을 쌓아보세요.</p>
                <button className="challenge-button">💪 챌린지 참여하기</button>
            </section>


            <section className="testimonial-section">
                <h2>사용자 후기 🌟</h2>
                <div className="testimonial-content">
                    <div className="testimonial-item">
                        <div className="testimonial-emoji">😊</div>
                        <p>"이 웹사이트 덕분에 영단어 학습이 훨씬 쉬워졌어요! 자동 복습 기능이 정말 유용합니다."</p>
                        <p className="testimonial-name">- 박승빈</p>
                    </div>
                    <div className="testimonial-item">
                        <div className="testimonial-emoji">🎮</div>
                        <p>"친구들과 함께 단어 게임을 할 수 있어서 지루하지 않고, 경쟁하면서 배울 수 있어 좋습니다."</p>
                        <p className="testimonial-name">- 양제훈</p>
                    </div>
                    <div className="testimonial-item">
                        <div className="testimonial-emoji">📚</div>
                        <p>"단어장 기능 덕분에 내가 모르는 단어를 쉽게 관리하고 학습할 수 있었습니다."</p>
                        <p className="testimonial-name">- 이정은</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Main;
