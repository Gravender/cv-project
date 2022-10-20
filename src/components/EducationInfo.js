import React from "react";
const EducationInfo = (props) => {
  const { education, editEducation, show } = props;
  let editFunc = (key, value) => {
    let newEdu = { ...education, [key]: value };
    editEducation(newEdu);
  };
  const onEdit = (id, key) => {
    let jobProperty = document.getElementById(`education-${id}-${key}`);
    let formDiv = document.getElementById("editFormDiv");
    let form = document.getElementById("editForm");
    let text = document.getElementById("editFormText");
    formDiv.setAttribute("style", "display:block");
    let saveEdit = (e) => {
      e.preventDefault();
      editFunc(key, text.value);
      formDiv.setAttribute("style", "display:none");
      text.setAttribute("type", "text");
      form.removeEventListener("submit", saveEdit);
    };
    text.setAttribute("type", "text");
    text.value = jobProperty.dataset.text;
    form.addEventListener("submit", saveEdit);
  };
  const editButton = (id, key) => {
    if (show) {
      return (
        <div>
          <button onClick={() => onEdit(id, key)}>Edit {key}</button>
        </div>
      );
    }
    return null;
  };
  return (
    <div
      className={show ? "editing educationInfo" : "educationInfo"}
      id={`education-${education.id}`}
    >
      <span
        className="eduDate"
        id={`education-${education.id}-dateOfStudy`}
        data-text={education.dateOfStudy}
      >
        {education.dateOfStudy}
      </span>
      {editButton(education.id, "dateOfStudy")}
      <div className="schoolInfo">
        <span
          className="degree"
          id={`education-${education.id}-degreeTitle`}
          data-text={education.degreeTitle}
        >
          {education.degreeTitle}
        </span>
        {editButton(education.id, "degreeTitle")}
        <em
          className="school"
          id={`education-${education.id}-schoolName`}
          data-text={education.schoolName}
        >
          {education.schoolName}
        </em>
        {editButton(education.id, "schoolName")}
      </div>
    </div>
  );
};
export default EducationInfo;
