import React, { useEffect, useState } from "react";
import "./styles.css";
export default function App() {


  const [newItem, setNewItem] = useState("");
  
  const [todos, setTodos] = useState(()=>{
    const localValue=localStorage.getItem("ITEMS")
    if(localValue==null) return []
    return JSON.parse(localValue)
  });


  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])

  function handleSubmit(e) {
    e.preventDefault(); //stops the page from refresing
    // Check if newItem is empty or only contains spaces
    if (!newItem.trim()) {
      alert("Please add a title 😉");
      return; // Stop the function from proceeding further
    }
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
        },
      ];
    });
    setNewItem("")
  }

  function deleteTodo(id){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo=> todo.id!==id)
    })
  }

  function deleteAll(){
    setTodos([])
  }

  function toggleTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if(todo.id===id){
          return {...todo,completed}  //returning a new todo state with a completed property
        }
        return todo;
      })
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form" action="">
        <div className="form-row">
          <label htmlFor="item">New Todo</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <div className="test">
      <h1 className="header">TodoList</h1>
      <button  className="t-btn" onClick={()=>{deleteAll()}}>Delete all Todos</button>
      </div>
      <ul className="list">
        {todos.length===0 && "No todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={e=>toggleTodo(todo.id,e.target.checked)} />{todo.title}
              </label>
              <button onClick={()=>deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
            
          );
        })}
      </ul>

      
    </>
  );
}
