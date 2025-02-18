import React from 'react';

const NavElem = ({ title, onClick }) => {
    return (
        <div className='hover:bg-sky-200 hover:rounded-md w-full py-2 px-2' onClick={onClick}>
            { title }
        </div>
    );
}

export default NavElem;
