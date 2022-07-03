import React from "react";
import { useState } from "react";
import "./ToDoComponent.css";

export const ToDoComponent = () => {
  const [value, setValue] = useState("");
  const [todo, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState("");

  const onChange = (event) => {
    event.stopPropagation();
    setValue(event.target.value);
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      value: value,
    };

    if (value !== "" && !edit) {
      setTodos([...todo, newTask]);
    }
    setValue("");
  };

  const delTask = (id) => {
    setTodos((todos) => todos.filter((el) => el.id !== id));
    setValue("");
  };

  const editTodo = (e, id) => {
    e.stopPropagation();
    setEdit(true);
    const editTask = todo.find((el) => el.id === id);
    setEditValue(editTask.value);
    setTodos([...todo, ...{ id: editTask.id, value: editValue }]);
    setEdit(false);
  };

  const applyEdit = (e) => {
    e.stopPropagation();
    setEdit(false);

    const newTask = {
      id: Date.now(),
      value: editValue,
    };
    setTodos([newTask]);
  };

  return (
    <div>
      <h1 className="Title">Todo list</h1>
      <input onChange={onChange} value={value} className="Input" />
      <button className="Button" onClick={addTask}>
        Add task
      </button>

      <ul>
        {todo.map((todo) => (
          <li onClick={() => delTask(todo.id)} key={todo.id}>
            {edit ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              todo.value
            )}

            <button className="Button" onClick={(e) => editTodo(e, todo.id)}>
              {edit ? (
                <button onClick={applyEdit}>Aplly edit task</button>
              ) : (
                "Edit task"
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
