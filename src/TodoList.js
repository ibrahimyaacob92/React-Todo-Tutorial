import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
    return (
        todos.map(todo =>{
            // key is a property required by react to assign ID to the element
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
        })
    )
}
