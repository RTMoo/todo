import TaskElem from "./TaskElem";
import { useEffect, useState } from "react";
import api from "../api";
import { FaFilter } from "react-icons/fa";

const TaskList = ({ params, updateFilter }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const getUserTasks = async () => {
        try {
            let url = "api/tasks/";
            const { is_completed, created_at } = params;

            let queryParams = [];
            if (is_completed) queryParams.push(`is_completed=${is_completed}`);
            if (created_at) queryParams.push(`created_at=${created_at}`);

            if (queryParams.length > 0) {
                url += `?${queryParams.join("&")}`;
            }
            console.log(url);
            const response = await api.get(url);
            setTasks(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке задач:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserTasks();
    }, [params]);

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="ml-70 mr-10 mt-10 w-full">
            <div className="flex justify-between">
                <h2 className="mb-5">Список задач</h2>

                <div className="relative inline-block text-left mb-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        <FaFilter className="mr-2" /> Фильтр и Сортировка
                    </button>
                    {isOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                            <div className="py-2">
                                <p className="px-4 text-sm font-semibold text-gray-600">Фильтр</p>
                                <button onClick={() => updateFilter({ is_completed: "null" })} className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                                    Все
                                </button>
                                <button onClick={() => updateFilter({ is_completed: "true" })} className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                                    Выполненные
                                </button>
                                <button onClick={() => updateFilter({ is_completed: "false" })} className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                                    Невыполненные
                                </button>
                            </div>
                            <hr />
                            <div className="py-2">
                                <p className="px-4 text-sm font-semibold text-gray-600">Сортировка</p>
                                <button onClick={() => updateFilter({ created_at: "desc" })} className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                                    Сначала новые
                                </button>
                                <button onClick={() => updateFilter({ created_at: "asc" })} className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                                    Сначала старые
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
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
