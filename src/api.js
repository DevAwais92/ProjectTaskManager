//getting API for showing all the data
export const getTodos = () => fetch("http://localhost:4000/").then(res => res.json())

//getting API for inserting the data
export const createTodo = (todo) => fetch("http://localhost:4000/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const updateTodo = (todo, id) => fetch(`http://localhost:4000/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const deleteTodo = (todo, id) => fetch(`http://localhost:4000/${id}`, {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for getting specific data
export const getTodo = (id) => fetch(`http://localhost:4000/${id}`).then(res => res.json())