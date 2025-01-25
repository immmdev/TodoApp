import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ToDo() {
    const [toDoes, setTodo] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [{ task: "sample task", id: uuidv4(), isDone: false }];
    });

    const [newTodo, setNewTodo] = useState("");

    const addNewtask = () => {
        const trimmedTask = newTodo.trim();

        if (trimmedTask === "") {
            alert("Task cannot be empty!");
            return;
        }

        const isDuplicate = toDoes.some(task => task.task.toLowerCase() === trimmedTask.toLowerCase());
        if (isDuplicate) {
            alert("Task already exists!");
            return;
        }

        const newTask = { task: trimmedTask, id: uuidv4(), isDone: false };
        const updatedTasks = [...toDoes, newTask];
        setTodo(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
        setNewTodo(""); 
    };

    const newTask = (event) => {
        setNewTodo(event.target.value);
    };

    const dltTsk = (id) => {
        const updatedTasks = toDoes.filter(task => task.id !== id);
        setTodo(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
    };

    const doneAll = () => {
        const doneAllTsk = toDoes.map(todo => ({ ...todo, isDone: true }));
        setTodo(doneAllTsk);
        localStorage.setItem('tasks', JSON.stringify(doneAllTsk)); 
    };

    const isDoneTsk = (id) => {
        const isDoneMarked = toDoes.map(todo => {
            if (todo.id === id) {
                return { ...todo, isDone: true };
            }
            return todo;
        });
        setTodo(isDoneMarked);
        localStorage.setItem('tasks', JSON.stringify(isDoneMarked)); 
    };

    return (
        <>
            <h1>TodoApp</h1>
            <div className="add-input-container">
                <div>
                    <input placeholder="Add a Task" value={newTodo} onChange={newTask}></input>
                </div>
                <div>
                    <button className="add-btn" onClick={addNewtask}>Add</button>
                </div>
            </div>
            <div className="main-container">
                <ul>
                    {toDoes.map((toDo) => (
                        <li key={toDo.id}>
                            <div className="task-container">
                                <div style={toDo.isDone ? { textDecorationLine: "line-through" } : {}}>
                                    {toDo.task}
                                </div>
                                <div className="operation-btn">
                                    <button onClick={() => dltTsk(toDo.id)}>Delete</button>
                                    <button onClick={() => isDoneTsk(toDo.id)}>Done</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="allDone" onClick={doneAll}>All Done</button>
            </div>
        </>
    );
}
