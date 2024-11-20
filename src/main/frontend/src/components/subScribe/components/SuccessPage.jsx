import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/SuccessPage.css';
import { useUser } from '../../User/UserContext';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser(); // UserContext에서 사용자 정보 가져오기

    useEffect(() => {
        const saveSubscription = async () => {
            const queryParams = new URLSearchParams(location.search);
            const paymentKey = queryParams.get('paymentKey');
            const orderId = queryParams.get('orderId');
            const amount = queryParams.get('amount');

            if (!paymentKey || !orderId || !amount) {
                navigate('/');
                return;
            }

            if (user && user.email) {
                try {
                    const response = await axios.post(`${`${window.location.origin}`}/api/payment/pay`, {
                        planName: '유료',
                        amount,
                        userEmail: user.email,
                        paymentKey,
                    });
                    console.log('구독 정보가 성공적으로 저장되었습니다:', response.data);
                } catch (error) {
                    console.error('구독 정보를 저장하는 중 오류가 발생했습니다:', error);
                    alert('결제 처리가 실패했습니다. 고객센터에 문의해주세요.');
                }
            } else {
                alert('사용자 정보가 없습니다. 다시 로그인해주세요.');
                navigate('/login');
            }
        };
        saveSubscription();
    }, [location, user, navigate]);

    return (
        <div className="success-container">
            <div className="success-card">
                <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h2 className="success-title">구독 성공!</h2>
                <p className="success-message">결제가 성공적으로 완료되었습니다.</p>
                <p className="success-description">
                    저희 서비스를 이용해 주셔서 감사합니다. 이제 모든 프리미엄 기능을 사용할 수 있습니다!
                </p>
                <button className="success-button" onClick={() => navigate('/')}>홈으로 돌아가기</button>
            </div>
        </div>
    );
};

export default SuccessPage;
