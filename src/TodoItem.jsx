import { useState } from "react";
import PropTypes from "prop-types";
import "./TodoItem.css";

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editedText);
    setEditing(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed1" : ""}`}>
      <span className={`todo-text ${todo.completed ? "completed2" : ""}`}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={handleEdit}>Guardar</button>
          </div>
        ) : (
          todo.text
        )}
      </span>
      {todo.completed ? (
        <span className="delete-btn" onClick={() => onDelete(todo.id)}>
          X
        </span>
      ) : (
        <span className="dropdown-btn" onClick={toggleMenu}>
          ...
        </span>
      )}
      {menuVisible && (
        <div className="dropdown-menu" onClick={closeMenu}>
          <div className="dropdown-item" onClick={() => setEditing(true)}>
            Editar
          </div>
          <div className="dropdown-item" onClick={() => onDelete(todo.id)}>
            Eliminar
          </div>
          <div
            className="dropdown-item"
            onClick={() => onToggleComplete(todo.id)}
          >
            Completo
          </div>
        </div>
      )}
    </div>
  );
};

TodoItem.PropTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoItem;
