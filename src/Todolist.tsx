import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
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
  checkboxChange: (id: string, status: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  
  const changeFilterHandler = (value: FilterValuesType) => {
	props.changeFilter(value)
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
	setError(false)
  }
  
  const addTaskHandler = () => {
	if (title) {
	  props.addTask(title.trim())
	  setTitle('')
	} else {
	  setError(true)
	}
  }
  
  const onKeypressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
	  addTaskHandler()
	}
  }
  
  const checkboxChangeHandler = (id: string, status: boolean) => {
	props.checkboxChange(id, status)
  }
  
  const activeFilterHandler = (filter: FilterValuesType) => {
	return props.filter === filter ? styles.filter__active : styles.filter
  }
  
  const onClickHandler = (id: string) => {
	props.removeTask(id)
  }
  
  return <div className={styles.todo}>
	<h3>{props.title}</h3>
	<div className={styles.todo__title}>
	  <input value={title} onChange={onChangeHandler}
			 onKeyPress={onKeypressHandler}
			 className={error ? styles.error : ''}/>
	  <button onClick={addTaskHandler}>+</button>
	  {error &&
      <span className={styles.error__message}>***Title is required</span>}
	</div>
	<ul className={styles.todolist}>
	  {
		props.tasks.map(t => <li key={t.id}
								 className={t.isDone ? styles.task__done : ''}>
		  <input type="checkbox" checked={t.isDone}
				 onChange={(e: ChangeEvent<HTMLInputElement>) => checkboxChangeHandler(t.id, e.currentTarget.checked)}/>
		  <span>{t.title}</span>
		  <button onClick={() => onClickHandler(t.id)}>x
		  </button>
		</li>)
	  }
	</ul>
	<div className={styles.filters}>
	  <button className={activeFilterHandler('all')}
			  onClick={() => changeFilterHandler('all')}>
		All
	  </button>
	  <button className={activeFilterHandler('active')}
			  onClick={() => changeFilterHandler('active')}>
		Active
	  </button>
	  <button className={activeFilterHandler('completed')}
			  onClick={() => changeFilterHandler('completed')}>
		Completed
	  </button>
	</div>
  </div>
}
