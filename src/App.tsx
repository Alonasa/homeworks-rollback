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
  let todolistId1 = v1();
  let todolistId2 = v1();
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
	{id: todolistId1, title: 'What to learn', filter: 'all'},
	{id: todolistId2, title: 'What to buy', filter: 'all'},
  ])
  
  let [tasks, setTasks] = useState({
	[todolistId1] : [
	  {id: v1(), title: 'HTML&CSS', isDone: true},
	  {id: v1(), title: 'JS', isDone: true},
	  {id: v1(), title: 'ReactJS', isDone: false},
	  {id: v1(), title: 'Rest API', isDone: false},
	  {id: v1(), title: 'GraphQL', isDone: false},
	],
	[todolistId2]: [
	  {id: v1(), title: 'HTML&CSS2', isDone: true},
	  {id: v1(), title: 'JS2', isDone: true},
	  {id: v1(), title: 'ReactJS2', isDone: false},
	  {id: v1(), title: 'Rest API2', isDone: false},
	  {id: v1(), title: 'GraphQL2', isDone: false},
	]
  });
  
  function removeTask(id: string, todlistId: string) {
	let filteredTasks = tasks[todlistId].filter(t => t.id !== id);
	setTasks({...tasks, [todlistId]:filteredTasks});
  }
  
  function changeFilter(todolistId: string, value: FilterValuesType) {
	setTodolists(todolists.map(t => t.id === todolistId ? {
	  ...t,
	  filter: value
	} : t))
  }
  
  const addTask = (title: string) => {
	//let task = {id: v1(), title: title, isDone: true}
	// setTasks([task, ...tasks])
  }
  
  const checkboxChange = (id: string, status: boolean) => {
	//setTasks(tasks.map(t => t.id === id ? {...t, isDone: status} : t))
  }
  
  return (
	<div className="App">
	  {todolists.map(t => {
		let tasksForTodolist = tasks[t.id];
		
		if (t.filter === 'active') {
		  tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
		}
		if (t.filter === 'completed') {
		  tasksForTodolist = tasks[t.id].filter(t => t.isDone);
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
		)
	  })}
	</div>
  );
}

export default App;
