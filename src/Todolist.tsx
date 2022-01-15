import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import {Input} from './components/Input';

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
    
    
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    
    return <div>
        <h3>{props.title}</h3>
        <div>
            {/*<input value={title} onChange={onChangeHandler}*/}
            {/*     onKeyPress={onKeyHandler}/>*/}
            <Input value={title} callback={onChangeHandler} keyCallback={onKeyHandler}/>
            <Button title={'+'} callback={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button title={'x'} callback={() => removeTaskHandler(t.id)}/>
                </li>)
            }
        </ul>
        <div>
            <Button title={' All'} callback={()=>changeFilterHandler('all')}/>
            <Button title={'Active'} callback={() => changeFilterHandler('active')}/>
            <Button title={'Completed'} callback={() => changeFilterHandler('completed')}/>
        </div>
    </div>
}
