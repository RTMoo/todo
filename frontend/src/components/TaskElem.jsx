import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import api from "../api";

const TaskElem = ({ id, title, setTasks }) => {
    const delete_task = async () => {
        try {
            await api.delete(`api/tasks/${id}/`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении задачи:", error);
        }
    };

    return (
        <div>
            <div className="w-full flex justify-between p-2 my-3">
                <a href={`task/${id}/`} className="flex justify-between w-full block">
                    {title}
                </a>
                <RiDeleteBin5Line className="text-red-500 cursor-pointer" onClick={delete_task} />
            </div>
            <hr className="border-gray-200" />
        </div>
    );
};

export default TaskElem;
