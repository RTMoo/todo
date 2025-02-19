import React, { useState } from 'react';
import NavElem from './NavElem';
import { useNavigate } from "react-router-dom";


const Nav = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();


    return (
        <nav className="flex flex-col w-60 bg-sky-100 h-screen px-4 fixed mr-60">
            <div className="py-3 px-2 font-medium text-md">
                {email}
            </div>
            <NavElem title='Создать' onClick={() => navigate('/?view=create')} />
            <NavElem title='Задачи' onClick={() => navigate('/?view=list')} />
        </nav>
    );
};

export default Nav;
