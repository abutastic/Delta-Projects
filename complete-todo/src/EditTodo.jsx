import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function EditTodo({ editTask, task }) {
  let [value, setValue] = useState(task.task);

  let handleChange = (e) => {
    setValue(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    editTask(value, task.id);
    setValue("");
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Update Task"
          variant="outlined"
          size="small"
          value={value}
          onChange={handleChange}
          required
        />
        <Button variant="contained" size="small" type="submit">
          UPDATE
        </Button>
      </form>
    </div>
  );
}
