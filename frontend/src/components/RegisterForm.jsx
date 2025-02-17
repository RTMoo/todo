import React from 'react';
import Form from './Form';

const RegisterForm = () => {
    return (
        <Form route={'/api/accounts/register/'} method={'register'}/>
    );
}

export default RegisterForm;
