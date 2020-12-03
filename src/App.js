import React, {useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  var todoData = [
    {id:1, name:'Todo 1', complete:false},
    {id:2, name:'Todo 2', complete:true}
  ]


  // common method of getting data from the array
  // const myUseState = useState(['todo 1', 'todo 2'])
  // const todosAlt = myUseState[0]

  // array destructuring - simplify the code
  const [todos, setTodos] = useState(todoData) // use state todo will always return an array [0] = data & [1] = function
  const todoNameRef = useRef()  // use reference to any element ?
  
  // load todo - Use effect will only run once since you're passing an empty array to its second argument
  useEffect(() => {
    const storedTodos = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  // run this everytime "todos" data changes..
  useEffect(()=>{
    sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  // function to change the state of todos
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  
  // to be apply in the onclick
  function handleAddTodo(e){
    const name = todoNameRef.current.value  // get value from the input tag
    if (name==='') return
    console.log(name)
    setTodos(prevTodos =>{
      return [...prevTodos, {id:uuidv4(), name:name, complete:false}] // concatenate to the previous todos
    })
    todoNameRef.current.value = null  // set value of the input tag to null
  }

  // 
  function handleClearTodos(e){
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" ></input>
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} Left Todo </div>
    </>
    
  )

}



export default App;
