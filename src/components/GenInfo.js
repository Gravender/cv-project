import React from "react";
const GenInfo = (props) => {
  const { general, editGeneral, show } = props;
  const onEdit = (key) => {
    let generalProperty = document.getElementById(`general-${key}`);
    let formDiv = document.getElementById("editFormDiv");
    let form = document.getElementById("editForm");
    let text = document.getElementById("editFormText");
    formDiv.setAttribute("style", "display:block");
    let saveEdit = (e) => {
      e.preventDefault();
      editGeneral(key, text.value);
      formDiv.setAttribute("style", "display:none");
      form.removeEventListener("submit", saveEdit);
    };
    text.setAttribute("type", "text");
    text.value = generalProperty.dataset.text;
    form.addEventListener("submit", saveEdit);
  };
  const editButton = (key) => {
    if (show) {
      return (
        <div>
          <button onClick={() => onEdit(key)}>Edit {key}</button>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="General">
      <h1>
        <span id={`general-fName`} data-text={general.fName}>
          {general.fName}
        </span>
        {editButton("fName")}
        <span id={`general-lName`} data-text={general.lName}>
          {general.lName}
        </span>
        {editButton("lName")}
      </h1>
      <h4>
        <ul>
          <li id={`general-email`} data-text={general.email}>
            {general.email}
          </li>
          {editButton("email")}
          <li id={`general-phone`} data-text={general.phone}>
            {general.phone}
          </li>
          {editButton("phone")}
        </ul>
      </h4>
    </div>
  );
};
export default GenInfo;
