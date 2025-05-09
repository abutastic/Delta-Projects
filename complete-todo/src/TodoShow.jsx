import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoShow({
  todoObj,
  toggleDone,
  deleteTodo,
  editTodo,
}) {
  return (
    <div key={todoObj.id} className="todo">
      <p
        style={{
          textDecoration: todoObj.isCompleted ? "line-through" : "none",
        }}
      >
        {todoObj.task}
      </p>
      <div>
        <span onClick={() => toggleDone(todoObj.id)}>
          {<FileDownloadDoneIcon />}
        </span>
        <span onClick={() => editTodo(todoObj.id)}>{<EditIcon />}</span>
        <span onClick={() => deleteTodo(todoObj.id)}>{<DeleteIcon />}</span>
      </div>
    </div>
  );
}
