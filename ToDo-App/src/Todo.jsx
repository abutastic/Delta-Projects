import "./Todo.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Todo() {
  let [tasks, setTasks] = useState([
    { task: "sample task", id: uuidv4(), isDone: false },
  ]);
  let [newTask, setNewTask] = useState("");

  function createTask(event) {
    event.preventDefault();
    if (newTask !== "") {
      setTasks((prevTasks) => {
        return [...prevTasks, { task: newTask, id: uuidv4(), isDone: false }];
      });

      setNewTask("");
    }
  }

  function generateTask(event) {
    setNewTask(event.target.value);
  }

  function done(id) {
    setTasks((prevTasks) => {
      return prevTasks.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: (todo.isDone = true) };
        } else {
          return todo;
        }
      });
    });
  }

  function deleteTask(id) {
    setTasks((prevTasks) => {
      return prevTasks.filter((todo) => {
        return todo.id !== id;
      });
    });
  }

  return (
    <>
      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Write your task here"
          value={newTask}
          onChange={generateTask}
        />
        <button>Add Task</button>
      </form>
      <div className="container">
        <h2>Tasks to be done</h2>
        {tasks.map((task) => (
          <div className="task">
            <p
              key={task.id}
              style={{ textDecoration: task.isDone ? "line-through" : "none" }}
            >
              {task.task}
            </p>
            <button className="taskBtn" id="done" onClick={() => done(task.id)}>
              Done
            </button>
            <button
              className="taskBtn"
              id="delete"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
