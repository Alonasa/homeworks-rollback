import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (title: string, todolistId: string) => void
  checkboxChange: (id: string, status: boolean, todolistId: string) => void
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  
  const changeFilterHandler = (todolistId: string, value: FilterValuesType) => {
	props.changeFilter(todolistId, value)
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
	setError(false)
  }
  
  const addTaskHandler = (todolistId: string) => {
	if (title) {
	  props.addTask(title.trim(),todolistId)
	  setTitle('')
	} else {
	  setError(true)
	}
  }
  
  const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
	 // addTaskHandler()
	}
  }
  
  const checkboxChangeHandler = (id: string, status: boolean, todolistId: string) => {
	props.checkboxChange(id, status, todolistId)
  }
  
  const activeFilterHandler = (filter: FilterValuesType) => {
	return props.filter === filter ? styles.filter__active : styles.filter
  }
  
  const onClickHandler = (id: string, todolistId: string) => {
	props.removeTask(id, todolistId)
  }
  
  return <div className={styles.todo}>
	<h3>{props.title}</h3>
	<div className={styles.todo__title}>
	  <input value={title} onChange={onChangeHandler}
			 onKeyPress={onKeypressHandler}
			 className={error ? styles.error : ''} type={'text'}/>
	  <button onClick={()=>addTaskHandler(props.todolistId)}>+</button>
	  {error &&
      <span className={styles.error__message}>***Title is required</span>}
	</div>
	<ul className={styles.todolist}>
	  {
		props.tasks.map(t => <li key={t.id}
								 className={t.isDone ? styles.task__done : ''}>
		  <input type="checkbox" checked={t.isDone}
				 onChange={(e: ChangeEvent<HTMLInputElement>) => checkboxChangeHandler(t.id, e.currentTarget.checked, props.todolistId)}/>
		  <span>{t.title}</span>
		  <button onClick={() => onClickHandler(t.id, props.todolistId)}>x
		  </button>
		</li>)
	  }
	</ul>
	<div className={styles.filters}>
	  <button className={activeFilterHandler('all')}
			  onClick={() => changeFilterHandler(props.todolistId, 'all')}>
		All
	  </button>
	  <button className={activeFilterHandler('active')}
			  onClick={() => changeFilterHandler(props.todolistId, 'active')}>
		Active
	  </button>
	  <button className={activeFilterHandler('completed')}
			  onClick={() => changeFilterHandler(props.todolistId, 'completed')}>
		Completed
	  </button>
	</div>
  </div>
}
