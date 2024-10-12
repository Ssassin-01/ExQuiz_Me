import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/SuccessPage.css';
import { useUser } from '../../User/UserContext';

const SuccessPage = () => {
    const location = useLocation();
    const { user } = useUser(); // UserContext에서 사용자 정보 가져오기

    useEffect(() => {
        const saveSubscription = async () => {
            const queryParams = new URLSearchParams(location.search);
            const paymentKey = queryParams.get('paymentKey');
            const orderId = queryParams.get('orderId');
            const amount = queryParams.get('amount');

            if (paymentKey && orderId && amount && user && user.email) {
                try {
                    // 구독 정보 저장을 위한 백엔드 호출
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/pay`, {
                        planName: '유료',
                        amount: amount,
                        userEmail: user.email,
                    });
                    console.log('Subscription successfully saved:', response.data);
                } catch (error) {
                    console.error('Error while saving subscription:', error);
                }
            }
        };

        saveSubscription();
    }, [location, user]);

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
                <button className="success-button" onClick={() => window.location.href = '/'}>홈으로 돌아가기</button>
            </div>
        </div>
    );
};

export default SuccessPage;