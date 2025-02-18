import React, { useState, useEffect, useRef } from "react";
import Field from "./Field";
import api from "../api";
import {useNavigate} from "react-router-dom"

const AddTaskModal = ({ onClose, updateTasks }) => {
    const navigate = useNavigate()

    const modalRef = useRef(null);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title: taskName,
            description: taskDescription,
        };

        try {
            await api.post("/api/tasks/", taskData);
            navigate('/')
            updateTasks();
            
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
        }
    };

    return (
        <dialog ref={modalRef} className="modal absolute m-auto border rounded-xl p-10 w-1/3 min-w-96">
            <div className="modal-box">
                <Field label="Название" onChange={(e) => setTaskName(e.target.value)} />
                <Field label="Описание" onChange={(e) => setTaskDescription(e.target.value)} />
                
                <button 
                    onClick={handleSubmit} 
                    className="w-full p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-700 cursor-pointer mb-5">
                    Создать
                </button>
                <div className="modal-action">
                    <button 
                        onClick={onClose} 
                        className="w-full p-3 bg-red-300 rounded-xl text-white hover:bg-red-500 cursor-pointer">
                        Закрыть
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default AddTaskModal;
