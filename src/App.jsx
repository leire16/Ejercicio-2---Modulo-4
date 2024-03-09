// App.jsx
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import LoginComponent from './Login'; // Importa el nuevo componente de inicio de sesión
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para controlar el inicio de sesión

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

  const onLogin = (token) => {
    // Esta función se llama desde el componente de inicio de sesión cuando se ha iniciado sesión correctamente
    // Puedes usar el token para realizar acciones adicionales si es necesario
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        // Mostrar la lista de TODOs si el usuario ha iniciado sesión
        <>
          <h1>Lista TODO</h1>
          <input
            type="text"
            placeholder="Añadir Tarea"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Añadir TODO</button>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={editTodo}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
            />
          ))}
        </>
      ) : (
        // Mostrar el componente de inicio de sesión si el usuario no ha iniciado sesión
        <LoginComponent onLogin={onLogin} />
      )}
    </div>
  );
};

export default App;
