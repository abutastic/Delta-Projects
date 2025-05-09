import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function TodoInput({ addTodo }) {
  let [value, setValue] = useState("");

  let handleChange = (e) => {
    setValue(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter Task"
          variant="outlined"
          size="small"
          value={value}
          onChange={handleChange}
          required
        />
        <Button variant="contained" size="small" type="submit">
          ADD
        </Button>
      </form>
    </div>
  );
}
