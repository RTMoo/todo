import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import TaskAdd from '../components/TaskAdd';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const [searchParams] = useSearchParams();
    const view = searchParams.get("view") || "list";

    return (
        <div className="flex w-full h-full">
            <Nav />
            {view === 'list' ? <TaskList /> : <TaskAdd />}
        </div>
    )
}

export default Home;