import React from "react";
import "../components/css/MainFooter.css";
import { useNavigate } from "react-router-dom";

export const MainFooter = () => {
    const navigate = useNavigate();

    const moveTo = (path) => (e) => {
        e.preventDefault(); // 기본 동작 방지
        navigate(path);
    };

    return (
        <div className="footerScreen container-fluid py-5 text-light">
            <div className="row">
                <div className="col-12 col-md mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mx-auto mb-2"
                         role="img" viewBox="0 0 24 24">
                        <title>Study Hub</title>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
                    </svg>
                    <small className="d-block mb-3 text-muted">2024 © os - Exquiz-Me!</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Learning</h5>
                    <ul className="list-unstyled text-small">
                        <li>
                            <a className="link-secondary text-decoration-none" href="/" onClick={moveTo('/study')}>
                                카드 목록
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Make</h5>
                    <ul className="list-unstyled text-small">
                        <li>
                            <a className="link-secondary text-decoration-none" href="/" onClick={moveTo('/make')}>
                                카드 만들기
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Game</h5>
                    <ul className="list-unstyled text-small">
                        <li>
                            <a className="link-secondary text-decoration-none" href="/" onClick={moveTo('/game')}>
                                게임 하기
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Mypage</h5>
                    <ul className="list-unstyled text-small">
                        <li>
                            <a className="link-secondary text-decoration-none" href="/" onClick={moveTo('/mypage')}>
                                내 정보 보기
                            </a>
                        </li>
                        <li>
                            <a className="link-secondary text-decoration-none" href="/" onClick={moveTo('/subscribe')}>
                                구독 하기
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};