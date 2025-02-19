import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import TaskAdd from '../components/TaskAdd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const view = searchParams.get("view") || "list";

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
            <Nav />
            { view === 'list' ? <TaskList tasks={tasks} loading={loading}/> : <TaskAdd />}
        </div>
    )
}

export default Home;