import React from 'react';

const TaskElem = ({ id, title, is_completed }) => {
    return (
        <div>
            <div className='w-full flex justify-between p-2 my-3' key={id}>
                <a href={`task/${id}/`} className="flex justify-between w-full">
                    <p>{title}</p>
                    <p>{is_completed ? "✔️" : "❌"}</p>
                </a>
            </div>
            <hr className='border-gray-200'/>
        </div>
    );
}

export default TaskElem;
