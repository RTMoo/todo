import React from 'react';

const TaskElem = ({ id, title, is_completed }) => {
    return (
        <div className='w-full border rounded-md flex justify-between p-2' key={id}>
            <a href={`task/${id}/`} className="flex justify-between w-full">
                <p>{title}</p>
                <p>{is_completed ? "✔️" : "❌"}</p>
            </a>
        </div>
    );
}

export default TaskElem;
