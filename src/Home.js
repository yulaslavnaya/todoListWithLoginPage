import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoForm from './comp/todos/TodoForm';
import TodoList from './comp/todos/TodoList';
import TodoActions from './comp/todos/TodoActions';

function Home() {
  const [currentValue, setValue] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(data => setValue(data))
      .catch(error => console.log(error));
  }, []);

  function setTodoHandler(value) {
    const newTodo = {
      content: value,
      isComplited: false,
      id: uuidv4(),
    };

    // Add the new to-do item to the server
    fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then(response => response.json())
      .then(data => setValue([...currentValue, data]))
      .catch(error => console.log(error));
  }

  function deleteTodoHandler(id) {
    // Remove the to-do item from the server
    fetch(`http://localhost:8000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setValue(
        currentValue.filter((todo) => {
          return todo.id !== id;
        })
      ))
      .catch(error => console.log(error));
  }

  function clearCompletedHandler() {
    setValue(
      currentValue.filter((todo) => {
        return !todo.isComplited;
      })
    );
  }

  function resetTodoHandler() {
    currentValue.map((item) =>{
		fetch(`http://localhost:8000/todos/${item.id}`, {
      method: 'DELETE',
    })
      .catch((error) => console.log(error));
	})
	  setValue([]);
  }

  function toglleTodoHandler(id) {
    const todo = currentValue.find((todo) => todo.id === id);

    // Update the to-do item on the server
    fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, isComplited: !todo.isComplited }),
    })
      .then(response => response.json())
      .then(data => {
        setValue(
          currentValue.map((todo) => {
            if (todo.id === id) {
              return { ...data };
            } else {
              return { ...todo };
            }
          })
        );
      })
      .catch(error => console.log(error));
  }
  

  let completedTodos = currentValue.filter((todo) => {
    return todo.isComplited;
  }).length;
  console.log(completedTodos);
  return (
    <div className="TodoApp">
      <h1>Todo App</h1>
      <TodoForm setTodo={setTodoHandler} />

      {currentValue.length ? <TodoActions clearCompleted={clearCompletedHandler} resetTodo={resetTodoHandler} completed={!!completedTodos} /> : <></>}

      <TodoList posts={currentValue} deleteTodo={deleteTodoHandler} toglleTodo={toglleTodoHandler} />

      {!!completedTodos && <h2>{`You have completed ${completedTodos} ${completedTodos > 1 ? 'todos' : 'todo'}!`}</h2>}
    </div>
  );
}

export default Home;
