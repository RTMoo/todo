import React from 'react';
import Form from '../components/Form';

const RegisterForm = () => {
    return (
        <Form route={'/api/accounts/register/'} method={'register'}/>
    );
}

export default RegisterForm;
