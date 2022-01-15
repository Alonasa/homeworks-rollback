import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import {Input} from './components/Input';
import styles from './Todolist.module.css';

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
    changeStatus: (id: string, value: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false)
    
    const addTaskHandler = () => {
        if (title) {
            props.addTask(title.trim())
            setTitle('')
        }
        setError(true)
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
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
    
    // const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeStatus(e.currentTarget.checked)
    // }
    
    const activeFilterHandler = (value: FilterValuesType) => {
        return props.filter === value ? styles.filter__active : styles.filter
    }
    
    const taskStyleHandler = (t: boolean)=> {
       return t ? styles.task__done : ' '
    }
    
    const inputStyleHandler =()=> {
        return error ? styles.error : ''
    }
    
    return <div>
        <h3>{props.title}</h3>
        <div>
            {/*<input value={title} onChange={onChangeHandler}*/}
            {/*     onKeyPress={onKeyHandler} className={error ? styles.error : ''}/>*/}
            <Input value={title} callback={onChangeHandler}
                   keyCallback={onKeyHandler}
                   className={inputStyleHandler()}/>
            <Button title={'+'} callback={addTaskHandler}/>
            {error &&
            <span className={styles.error__message}>*Title is required</span>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }
                    return (<li key={t.id} className={taskStyleHandler(t.isDone)}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={changeStatusHandler}/>
                        <span>{t.title}</span>
                        <Button title={'x'}
                                callback={() => removeTaskHandler(t.id)}/>
                    </li>)
                })
            }
        </ul>
        <div>
            <Button title={'All'} callback={() => changeFilterHandler('all')}
                    className={activeFilterHandler('all')}/>
            <Button title={'Active'}
                    callback={() => changeFilterHandler('active')}
                    className={activeFilterHandler('active')}/>
            <Button title={'Completed'}
                    callback={() => changeFilterHandler('completed')}
                    className={activeFilterHandler('completed')}/>
        </div>
    </div>
}
