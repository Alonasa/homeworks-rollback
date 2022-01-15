import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    //changeFilter: (value: FilterValuesType) => void
    addTask: (title: string)=> void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    
    let [filter, setFilter] = useState<FilterValuesType>('all');
    
    let tasksForTodolist = props.tasks;
    
    if (filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    
    const changeFilterHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }
    
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTaskHandler(t.id)}>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => changeFilterHandler('all')}>
                All
            </button>
            <button onClick={() => changeFilterHandler('active')}>
                Active
            </button>
            <button onClick={() => changeFilterHandler('completed')}>
                Completed
            </button>
        </div>
    </div>
}
