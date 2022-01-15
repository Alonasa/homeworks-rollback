import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    
    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('');
    }
    
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    
    const onFilterHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }
    
    const removeHandler = (id: string) => {
        props.removeTask(id)
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
    
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={()=>removeHandler(t.id)}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => onFilterHandler('all')}>
                All
            </button>
            <button onClick={() => onFilterHandler('active')}>
                Active
            </button>
            <button onClick={() => onFilterHandler('completed')}>
                Completed
            </button>
        </div>
    </div>
}
