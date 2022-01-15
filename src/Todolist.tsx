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
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    
    const onClickHandler = () => {
        props.addTask(title);
        setTitle('');
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }
    
    const onFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={keyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTaskHandler(t.id)}>x</button>
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
