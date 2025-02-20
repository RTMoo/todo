import TaskElem from "./TaskElem";
import { useEffect, useState } from "react";
import api from "../api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const getUserTasks = async () => {
        try {
            const response = await api.get("api/tasks/");
            setTasks(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке задач:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserTasks();
    }, []);

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="ml-70 mr-10 mt-10 w-full">
            <h2 className="mb-5">Список задач</h2>
            {tasks.length === 0 ? (
                <p>Задач пока нет.</p>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <TaskElem 
                            key={task.id} 
                            id={task.id} 
                            title={task.title} 
                            setTasks={setTasks}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
