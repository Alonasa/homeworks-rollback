import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
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
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    
    const addTaskHandler = () => {
        props.addTask(title.trim())
        setTitle('')
    }
    
    const onKeypressHandler = (e:  KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
          addTaskHandler()
        }
    }
    
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeypressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
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
