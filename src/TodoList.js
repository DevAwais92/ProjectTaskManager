import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { getTodos } from "./api"
import axios from 'axios'

export const TodoList = () => {
  let [items, setItems] = useState([])
  
  useEffect(() => {
    let mounted = true;
    if(mounted){
      const fetchItems = async () => {
        const todos = await getTodos();
        setItems(todos)
        
      }
      fetchItems();
    }
    
    return () => mounted = false;
    
  })

  const deleteHandler = async (id) => {
    try{
      await axios.delete(`http://localhost:4000/${id}`);
      items = items.filter(todo => todo._id !== id);
    }catch(err){
      console.log(err.message)
    }
    
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Todo List</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Text</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(todo => (
                <tr key={todo._id}>
                  <td>
                    {todo.text}
                  </td>
                  <td>
                    <Link className="btn btn-info mr-3" to={`/edit/${todo._id}`}>Edit</Link>
                    <Link className="btn btn-danger" onClick={() => deleteHandler(todo._id)}>Delete</Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
