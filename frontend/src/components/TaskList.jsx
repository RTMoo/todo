

const TaskList = ({ tasks, loading }) => {
    
    if (loading) return <p>Загрузка...</p>;
        
    return (
        <div>
            <h2>Список задач</h2>
            {tasks.length === 0 ? (
                <p>Задач пока нет.</p>
            ) : (
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="link">
                        <a href={`task/${task.id}/`}>{task.title} </a> - {task.is_completed ? "✅ Завершена" : "❌ В процессе"}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default TaskList;
