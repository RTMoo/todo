import Nav from '../components/Nav';
import TaskList from '../components/TaskList';
import TaskAdd from '../components/TaskAdd';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get("view") || "list";
    const is_completed = searchParams.get("is_completed") || 'null';
    const created_at = searchParams.get("created_at") || 'null';

    let params = {};
    if (["true", "false"].includes(is_completed.toLowerCase())) {
        params.is_completed = is_completed;
    }
    if (["asc", "desc"].includes(created_at.toLowerCase())) {
        params.created_at = created_at;
    }

    const updateFilter = (newParams) => {
        const updatedParams = new URLSearchParams(searchParams);

        Object.keys(newParams).forEach((key) => {
            if (newParams[key] === null) {
                updatedParams.delete(key);
            } else {
                updatedParams.set(key, newParams[key]);
            }
        });

        setSearchParams(updatedParams);
    };

    return (
        <div className="flex w-full h-full">
            <Nav />
            {view === 'list' ? <TaskList params={params} updateFilter={updateFilter}/> : <TaskAdd />}
        </div>
    );
};

export default Home;
