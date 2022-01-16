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
  checkboxChange: (id: string, status: boolean)=> void
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
  
  return <div>
	<h3>{props.title}</h3>
	<div>
	  <input value={title} onChange={onChangeHandler}
			 onKeyPress={onKeypressHandler} className={error ? styles.error : ''}/>
	  <button onClick={addTaskHandler}>+</button>
        {error && <span className={styles.error__message}>***Title is required</span>}
	</div>
	<ul>
	  {
		props.tasks.map(t => <li key={t.id}>
		  <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>)=>checkboxChangeHandler(t.id, e.currentTarget.checked)}/>
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
