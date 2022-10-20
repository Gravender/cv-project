import React from "react";
import uniqid from "uniqid";
const ItemTasks = (props) => {
  const { tasks, editTask, show } = props;
  let editFunc = (id, newText) => {
    const filteredTask = tasks.map((task) => {
      if (task.id === id) {
        return { text: newText, id: task.id };
      } else {
        return { text: task.text, id: task.id };
      }
    });
    editTask(filteredTask);
  };
  const onDelete = (id) => {
    const filteredTask = tasks.filter((task) => task.id !== id);
    editTask(filteredTask);
  };
  const onEdit = (id) => {
    let task = document.getElementById(`task-${id}`);
    let formDiv = document.getElementById("editFormDiv");
    let form = document.getElementById("editForm");
    let text = document.getElementById("editFormText");
    formDiv.setAttribute("style", "display:block");
    let saveEdit = (e) => {
      e.preventDefault();
      editFunc(id, text.value);
      formDiv.setAttribute("style", "display:none");
      form.removeEventListener("submit", saveEdit);
    };
    text.value = task.dataset.text;
    form.addEventListener("submit", saveEdit);
  };
  const addTask = (e) => {
    e.preventDefault();
    let task = {
      text: e.target[0].value,
      id: uniqid(),
    };
    e.target[0].value = "";
    let newTasks = tasks.concat(task);
    editTask(newTasks);
  };
  const addTaskForm = (tasks) => {
    if (show) {
      return (
        <div>
          <form onSubmit={addTask}>
            <label htmlFor="addTaskInput">Enter Task</label>
            <input type="text" id="addTaskInput" />
            <button type="submit">Add Task</button>
          </form>
        </div>
      );
    }
    return null;
  };
  const showButton = (id) => {
    if (show) {
      return (
        <div>
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={() => onEdit(id)}>edit</button>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={show ? " tasks editing" : "tasks"}>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id} id={`task-${task.id}`} data-text={task.text}>
              {task.text}
              {showButton(task.id)}
            </li>
          );
        })}
      </ul>
      {addTaskForm(tasks)}
    </div>
  );
};

export default ItemTasks;
