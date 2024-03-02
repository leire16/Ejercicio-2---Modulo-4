// App.jsx
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <div className="container">
      <h1>Lista TODO</h1>
      <input
        type="text"
        placeholder='Añadir Tarea'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Añadir TODO</button>

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={editTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default App;