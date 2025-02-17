import React from 'react';
import Form from './Form';

const LoginForm = () => {
    return (
        <Form route={'/api/accounts/login/'} method={'login'}/>
    );
}

export default LoginForm;
