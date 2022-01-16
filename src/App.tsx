import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  //fix
  
  let[todolists, setTodolists]=useState<Array<TodolistsType>>([
	{id: v1(), title: 'What to learn', filter: 'all'},
	{id: v1(), title: 'What to buy', filter: 'all'},
  ])
  
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
  
  function changeFilter(todolistId: string,value: FilterValuesType) {
	setTodolists(todolists.map(t => t.id ===todolistId ? {...t, filter: value} : t))
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
	  { todolists.map(t=> {
		let tasksForTodolist = tasks;
	 
		if (t.filter === 'active') {
		tasksForTodolist = tasks.filter(t => !t.isDone);
		}
		if (t.filter === 'completed') {
		tasksForTodolist = tasks.filter(t => t.isDone);
		}
		
	  return (
		<Todolist key={t.id}
				  todolistId={t.id}
				  title={t.title}
				  tasks={tasksForTodolist}
				  removeTask={removeTask}
				  changeFilter={changeFilter}
				  addTask={addTask}
				  checkboxChange={checkboxChange}
				  filter={t.filter}
		/>
	  )})}
	</div>
  );
}

export default App;
