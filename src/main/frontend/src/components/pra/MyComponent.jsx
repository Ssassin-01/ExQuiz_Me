import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MyComponent = () => (
    <HelmetProvider>
        <div>
            <Helmet>
                <meta name="description" content="English word"/>
                <meta name="author" content="Jeong"/>
                <title>ExQuiz Me!!</title>
            </Helmet>
        </div>
    </HelmetProvider>
);

export default MyComponent;