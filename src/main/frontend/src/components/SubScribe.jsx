import React from 'react';
import './css/SubScribe.css';

const plans = [
    { id: 1, name: 'Startup', price: '9.90', description: 'For small companies', features: ['10 hours of support', '40MB of storage', 'Subdomain'] },
    { id: 2, name: 'Standard', price: '19.90', description: 'For medium companies', features: ['10 hours of support', '40MB of storage', 'Subdomain'] },
    { id: 3, name: 'Business', price: '29.90', description: 'For large companies', features: ['10 hours of support', '40MB of storage', 'Subdomain'] }
];

const PlanCard = ({ plan }) => (
    <div className="plan-card">
        <h3 className="plan-title">{plan.name}</h3>
        <p className="plan-price">${plan.price}</p>
        <p className="plan-description">{plan.description}</p>
        <ul className="plan-features">
            {plan.features.map((feature, index) => (
                <li key={index} className="feature">{feature}</li>
            ))}
        </ul>
        <button className="choose-plan-button">Choose Plan</button>
    </div>
);
const Subscribe = () => {
    return (
        <div className="subscribe-container">
            <h2 className="pricing-plans-title">Pricing Plans</h2>
            <div className="plans-container">
                {plans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        </div>
    );
};

export default Subscribe;