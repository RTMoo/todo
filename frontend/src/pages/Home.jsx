import Nav from '../components/Nav';
import TaskList from '../components/TaskList';

const Home = () => {

    return (
        <div className="flex w-full h-full">
            <Nav />
            <TaskList />
        </div>
    )
}

export default Home;
