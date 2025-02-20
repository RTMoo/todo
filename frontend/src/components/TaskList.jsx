import TaskElem from "./TaskElem";

const TaskList = ({ tasks, loading }) => {
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
                            is_completed={task.is_completed} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
