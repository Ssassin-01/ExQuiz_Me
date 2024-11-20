import React, { useEffect, useState } from 'react';
import './css/SubScribe.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import { useUser } from '../User/UserContext';

const apiUrl = `${window.location.origin}`;

const plans = [
    { id: 1, name: '무료', price: '0', description: '무료 플랜입니다', features: ['하루 제한 20문제', '덜 좋은 혜택', '등등등'] },
    { id: 2, name: '유료', price: '1500', description: '유료 플랜입니다', features: ['더 많은 문제 풀기', '좋은 혜택', '등등등'] },
];

const Subscribe = () => {
    const { user } = useUser();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);

    useEffect(() => {
        const checkSubscription = async () => {
            if (user && user.email) {
                try {
                    const response = await axios.get(`${apiUrl}/api/payment/checkSubscription`, {
                        params: { userEmail: user.email },
                        withCredentials: true,
                    });

                    if (response.data && typeof response.data === 'object') {
                        setIsSubscribed(true);
                        setSubscriptionInfo(response.data);
                    } else {
                        setIsSubscribed(false);
                    }
                } catch (error) {
                    console.error('Error checking subscription:', error);
                }
            }
        };
        checkSubscription();
    }, [user]);

    const handlePayment = async (plan) => {
        if (plan.name === '유료') {
            try {
                const tossPayments = await loadTossPayments('test_ck_BX7zk2yd8yOONe00xvlQVx9POLqK');
                tossPayments.requestPayment('카드', {
                    amount: plan.price,
                    orderId: `ORDER_${new Date().getTime()}`,
                    orderName: plan.name,
                    successUrl: `${window.location.origin}/success`,
                    failUrl: `${window.location.origin}/fail`,
                });
            } catch (error) {
                console.error('Payment failed:', error);
            }
        } else {
            console.log('무료 플랜 선택됨');
        }
    };
    const handleUnsubscribe = async () => {
        if (user && user.email) {
            try {
                const response = await axios.post(
                    `${apiUrl}/api/payment/cancelSubscription`,
                    { userEmail: user.email },
                    { withCredentials: true }
                );

                if (response.data.status === 'success') {
                    setIsSubscribed(false);
                    setSubscriptionInfo(null);
                    alert('구독이 성공적으로 취소되었습니다.');
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error cancelling subscription:', error);
                alert('구독 취소 중 오류가 발생했습니다.');
            }
        }
    };

    if (isSubscribed && subscriptionInfo) {
        return (
            <div className="subscribe-container">
                <h2 className="pricing-plans-title">이미 구독자이십니다!</h2>
                <div className="subscription-info">
                    <p>구독 플랜: {subscriptionInfo.subscriptionPlan}</p>
                    <p>만료 날짜: {subscriptionInfo.expirationDate}</p>
                </div>
                <button className="unsubscribe-button" onClick={handleUnsubscribe}>
                    구독 취소하기
                </button>
            </div>
        );
    }

    return (
        <div className="subscribe-container">
            <h2 className="pricing-plans-title">구독</h2>
            <div className="plans-container">
                {plans.map(plan => (
                    <div key={plan.id} className="plan-card">
                        <h3 className="plan-title">{plan.name}</h3>
                        <p className="plan-price">₩{plan.price}</p>
                        <p className="plan-description">{plan.description}</p>
                        <ul className="plan-features">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="feature">{feature}</li>
                            ))}
                        </ul>
                        <button
                            className={`choose-plan-button ${plan.name === '무료' ? 'disabled' : ''}`}
                            onClick={() => handlePayment(plan)}
                        >
                            {plan.name === '무료' ? '현재 선택된 플랜' : '결제하기'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscribe;
