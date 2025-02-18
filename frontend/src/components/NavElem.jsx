import React from 'react';

const NavElem = ({ title }) => {
    return (
        <div className='hover:bg-sky-200 hover:rounded-md w-full py-2 px-2'>
            { title }
        </div>
    );
}

export default NavElem;
