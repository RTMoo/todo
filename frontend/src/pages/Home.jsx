import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import { useEffect, useState } from 'react';
import api from '../api';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserTasks();
    }, []);
    
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

    return (
        <div className="flex w-full h-full">
            <Nav updateTasks={getUserTasks}/>
            <TaskList tasks={tasks} loading={loading}/>
        </div>
    )
}

export default Home;