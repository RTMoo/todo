import TaskElem from "./TaskElem";

const TaskList = ({ tasks, loading }) => {
    if (loading) return <p>Загрузка...</p>;

    return (
        <div className="ml-80 w-full">
            <h2>Список задач</h2>
            {tasks.length === 0 ? (
                <p>Задач пока нет.</p>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <TaskElem 
                            key={task.id} 
                            id={task.id} 
                            title={task.title} 
                            is_completed={task.is_completed} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
