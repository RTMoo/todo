import React, { useState } from "react";
import Field from "./Field";
import api from "../api";
import { useNavigate } from "react-router-dom";

const TaskAdd = () => {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title: taskName,
            description: taskDescription,
        };

        try {
            await api.post("/api/tasks/", taskData);
            navigate('/?view=list');
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
        }
    };

    return (
        <div className="ml-70 mr-10 w-full bg-white mx-auto mt-10">
            <h2 className="text-xl font-bold mb-5">Создать задачу</h2>
            <Field label="Название" onChange={(e) => setTaskName(e.target.value)} />
            <Field label="Описание" onChange={(e) => setTaskDescription(e.target.value)} />
            
            <button 
                onClick={handleSubmit} 
                className="w-full p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-700 cursor-pointer mb-3">
                Создать
            </button>
        </div>
    );
};

export default TaskAdd;
