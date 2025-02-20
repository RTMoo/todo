import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import api from '../api';
import Field from './Field'

const Form = ({ route, method }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login' : 'Register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {

            const data = method === 'login'? { email, password }: {email, password, password2};
            const res = await api.post(route, data);


            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem('email', data.email);
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div>
                Загрузка
            </div>
        )
    }
    return (
        <div className='w-full flex justify-center items-center h-screen bg-gray-200'>
            <div className='bg-white rounded-xl drop-shadow-md w-full min-w-xs w-md flex flex-col items-center mb-20 px-5 pt-15 pb-5'>
                <h2 className="text-4xl mb-10">{name}</h2>
                <form onSubmit={handleSubmit} className='w-full'>
                    <Field label={'Email address'} type={'email'} placeholder={'example@gmail.com'}
                        onChange={(e) => setEmail(e.target.value)} value={email}
                    />
                    <Field label={'Password'} type={'password'} placeholder={'enter password here'}
                        onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                    {method !== 'register' ? <div></div>: 
                        <Field label={'Repeat'} type={'password'} placeholder={'repeat password'}
                        onChange={(e) => setPassword2(e.target.value)} value={password2}
                    />
                    }
                    <button type="submit" className="w-full p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-700 cursor-pointer">{name}</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
