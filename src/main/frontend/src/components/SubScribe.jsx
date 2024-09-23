import React from 'react';
import './css/SubScribe.css';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const apiUrl = process.env.REACT_APP_SPRING_SECURITY_ALLOWED_ORIGINS;

const plans = [
    { id: 1, name: '무료', price: '0', description: '무료 플랜입니다', features: ['하루 제한 20문제', '덜 좋은 혜택', '등등등'] },
    { id: 2, name: '유료', price: '1500', description: '유료 플랜입니다', features: ['더 많은 문제 풀기', '좋은 혜택', '등등등'] },
];

const PlanCard = ({ plan }) => {
    const isFreePlan = plan.name === '무료';
    return (
        <div className="plan-card">
            <h3 className="plan-title">{plan.name}</h3>
            <p className="plan-price">₩{plan.price}</p>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
                {plan.features.map((feature, index) => (
                    <li key={index} className="feature">{feature}</li>
                ))}
            </ul>
            <button className={`choose-plan-button ${isFreePlan ? 'disabled' : ''}`} onClick={() => handlePayment(plan)}>
                {isFreePlan ? '현재 선택된 플랜' : '결제하기'}
            </button>
        </div>
    );
};

const handlePayment = async (plan) => {
    if (plan.name === '유료') {
        try {
            const tossPayments = await loadTossPayments('test_ck_BX7zk2yd8yOONe00xvlQVx9POLqK');
            tossPayments.requestPayment('카드', {
                amount: plan.price,
                orderId: 'ORDER_ID', // 고유 주문 ID
                orderName: plan.name,
                successUrl: `${apiUrl}/success`, // 결제 성공시 리다이렉트 URL
                failUrl: `${apiUrl}/fail`, // 결제 실패시 리다이렉트 URL
            });
        } catch (error) {
            console.error('Payment failed:', error);
        }
    } else {
        console.log('무료 플랜 선택됨');
    }
};

const Subscribe = () => {
    return (
        <div className="subscribe-container">
            <h2 className="pricing-plans-title">구독</h2>
            <div className="plans-container">
                {plans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default Subscribe;
