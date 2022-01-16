import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  
  let [tasks, setTasks] = useState([
	{id: v1(), title: 'HTML&CSS', isDone: true},
	{id: v1(), title: 'JS', isDone: true},
	{id: v1(), title: 'ReactJS', isDone: false},
	{id: v1(), title: 'Rest API', isDone: false},
	{id: v1(), title: 'GraphQL', isDone: false},
  ]);
  
  function removeTask(id: string) {
	let filteredTasks = tasks.filter(t => t.id !== id);
	setTasks(filteredTasks);
  }
  
  let [filter, setFilter] = useState<FilterValuesType>('all');
  
  let tasksForTodolist = tasks;
  
  if (filter === 'active') {
	tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
	tasksForTodolist = tasks.filter(t => t.isDone);
  }
  
  function changeFilter(value: FilterValuesType) {
	setFilter(value);
  }
  
  const addTask = (title: string) => {
	let task = {id: v1(), title: title, isDone: true}
	setTasks([task, ...tasks])
  }
  
  const checkboxChange = (id: string, status: boolean) => {
	setTasks(tasks.map(t => t.id === id ? {...t, isDone: status} : t))
  }
  
  return (
	<div className="App">
	  <Todolist title="What to learn"
				tasks={tasksForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				checkboxChange={checkboxChange}
				filter={filter}
	  />
	</div>
  );
}

export default App;
