import React, { useEffect, useState } from "react";

import api from "../api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserTasks = async () => {
            try {
                const response = await api.get("api/tasks/");
                setTasks(response.data);  // Записываем данные в состояние
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            } finally {
                setLoading(false);
            }
        };

        getUserTasks();
    }, []);

    if (loading) return <p>Загрузка...</p>;
        
    return (
        <div>
            <h2>Список задач</h2>
            {tasks.length === 0 ? (
                <p>Задач пока нет.</p>
            ) : (
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="link">
                        <a href={`task/${task.id}/`}>{task.title} </a> - {task.is_completed ? "✅ Завершена" : "❌ В процессе"}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default TaskList;
