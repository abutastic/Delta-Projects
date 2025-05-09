import TodoInput from "./TodoInput";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoShow from "./TodoShow";
import EditTodo from "./EditTodo";

export default function Todo() {
  let [todos, setTodos] = useState([]);

  let addTodo = (value) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { task: value, id: uuidv4(), isCompleted: false, isEditing: false },
      ];
    });
  };

  let toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  let editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  let editTask = (value, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task: value, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  return (
    <>
      <h2>ToDo Application</h2>
      <TodoInput addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodo editTask={editTask} task={todo} />
        ) : (
          <TodoShow
            todoObj={todo}
            key={index}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </>
  );
}
