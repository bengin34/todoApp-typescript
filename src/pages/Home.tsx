import axios from "axios";
import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import TodoList from "../components/TodoList";

const url = "https://642ff761c26d69edc887bbf1.mockapi.io/todos";

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = async () => {
    try {
      const { data } = await axios.get<TodoType[]>(url);
      setTodos(data);
    } catch (error) {}
  };

const addTodo:AddFn = async (text) => {
  const newTodo = { 
    task: text,
    isDone: false
  }
  try {
    await axios.post(url, newTodo)
    getTodos()
  } catch (error) {
    
  }
}

const toggleTodo:ToggleFn = async (item) => {
  try {
    await axios.put(`${url}/${item.id}`, {...item, isDone:!item.isDone})
    getTodos()
  } catch (error) {
    console.log(error)
  }
}

const deleteTodo:DeleteFn = async (id) => {
  try {
    await axios.delete(`${url}/${id}`)
    getTodos()
  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="main">
      <InputForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </div>
  );
};

export default Home;
