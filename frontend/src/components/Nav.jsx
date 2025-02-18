import React from 'react';
import NavElem from './NavElem';

const Nav = () => {
    const email = localStorage.getItem('email');

    return (
        <nav className="flex flex-col w-70 bg-sky-100 h-screen px-4">
            <div className="py-3 px-2 font-medium text-md">
                {email}
            </div>
            <NavElem title='Добавить задачу' />
            <NavElem title='Поиск' />
        </nav>
    );
}

export default Nav;
