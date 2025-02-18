import React, { useState } from 'react';
import NavElem from './NavElem';
import AddTaskModal from './AddTaskModal';

const Nav = ({ updateTasks }) => {
    const email = localStorage.getItem('email');
    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <nav className="flex flex-col w-70 bg-sky-100 h-screen px-4">
            <div className="py-3 px-2 font-medium text-md">
                {email}
            </div>
            <NavElem title='Добавить задачу' onClick={() => setIsFormVisible(true)} />
            <NavElem title='Поиск' />
            {isFormVisible && <AddTaskModal onClose={() => setIsFormVisible(false)} updateTasks={updateTasks} />} {/* <-- Передаем updateTasks */}
        </nav>
    );
};

export default Nav;
