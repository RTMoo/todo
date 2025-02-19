import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import api from "../api";

const TaskInfo = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null)

    useEffect(() => {
        const get_task_info = async (id) => {
            try {
                const res = await api.get(`api/tasks/${id}/`);
                setTask(res.data);
            } catch (error) {
                console.error("Ошибка загрузки задачи:", error);
            }
        }

        get_task_info(id)
    }, [])

    if (!task) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="flex w-full h-full">
            <Nav />
            <div className="flex flex-col ml-80">
                {Object.entries(task).map(([key, value]) => (
                    <p key={key}>
                        {key}: {`${value}`}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default TaskInfo;
