import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
	{id: todolistId1, title: 'What to learn', filter: 'all'},
	{id: todolistId2, title: 'What to buy', filter: 'all'},
  ])
  
  let [tasks, setTasks] = useState<TasksStateType>({
	[todolistId1]: [
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
	setTasks({...tasks, [todlistId]: filteredTasks});
  }
  
  function changeFilter(todolistId: string, value: FilterValuesType) {
	setTodolists(todolists.map(t => t.id === todolistId ? {
	  ...t,
	  filter: value
	} : t))
  }
  
  const addTask = (title: string, todolistId: string) => {
	let task: TaskType = {id: v1(), title: title, isDone: false}
	setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
  }
  
  const checkboxChange = (id: string, status: boolean, todolistId: string) => {
	setTasks({
	  ...tasks,
	  [todolistId]: tasks[todolistId].map(t => t.id === id ? {
		...t,
		isDone: status
	  } : t)
	})
  }
  
  const removeTodolist = (todolistId: string) => {
  	delete tasks[todolistId]
	setTasks(tasks)
	setTodolists(todolists.filter(tl => tl.id !== todolistId))
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
					removeTodolist={removeTodolist}
		  />
		)
	  })}
	</div>
  );
}

export default App;
