import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import api from "../api";

const TaskInfo = () => {
    const { id } = useParams();
    const [task, setTask] = useState({ title: "", description: "", is_completed: false });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        get_task_info(id);
    }, [id]);

    const get_task_info = async (id) => {
        try {
            const res = await api.get(`api/tasks/${id}/`);
            setTask(res.data);
        } catch (error) {
            console.error("Ошибка загрузки задачи:", error);
        }
    };

    const update_task = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage("");

        try {
            await api.patch(`api/tasks/${id}/`, task);
            setMessage("✔ Задача обновлена!");
        } catch (error) {
            setMessage("❌ Ошибка при обновлении!");
            console.error("Ошибка обновления задачи:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e) => {
        const { id, type, checked, value } = e.target;
        setTask({
            ...task,
            [id]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div className="flex w-full h-full">
            <Nav />
            <div className="flex flex-col mt-10 ml-70 mr-10 w-full">
                <form className="w-full" onSubmit={update_task}>
                    <div className="pb-10">
                        <label htmlFor="title" className="mr-10 block">Заголовок:</label>
                        <input
                            id="title"
                            type="text"
                            value={task.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <hr className="border-gray-200" />
                    <div className="py-10">
                        <label htmlFor="description" className="mr-10">Описание:</label>
                        <textarea
                            id="description"
                            value={task.description}
                            onChange={handleChange}
                            placeholder="Введите описание..."
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <hr className="border-gray-200" />

                    <label className="flex items-center space-x-3 cursor-pointer py-10">
                        <input
                            type="checkbox"
                            id="is_completed"
                            checked={task.is_completed}
                            onChange={handleChange}
                            className="w-6 h-6 text-blue-500 bg-gray-100 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Задача выполнена</span>
                    </label>

                    <button
                        type="submit"
                        className={`px-5 py-3 my-10 w-full text-white rounded-lg ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
                        disabled={isSaving}
                    >
                        {isSaving ? "Сохранение..." : "Обновить"}
                    </button>

                    {message && (
                        <p className={`text-center text-lg ${message.startsWith("✔") ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default TaskInfo;
