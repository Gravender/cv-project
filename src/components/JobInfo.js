import React from "react";
import ItemTasks from "./ItemTasks";
const JobInfo = (props) => {
  const { job, removeDuty, editJob, show } = props;
  const editDuty = (filteredDuties) => {
    removeDuty(filteredDuties);
  };
  let editFunc = (key, value) => {
    let newJob = { ...job, [key]: value };
    editJob(newJob);
  };
  const onEdit = (id, key) => {
    let jobProperty = document.getElementById(`job-${id}-${key}`);
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
    if (key === "dateTo" || key === "dateFrom") {
      text.setAttribute("type", "date");
    } else {
      text.setAttribute("type", "text");
    }
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
    <div className={show ? "editing job" : "job"}>
      <div className="jobDate">
        <span
          className="date"
          id={`job-${job.id}-dateTo`}
          data-text={job.dateTo}
        >
          {job.dateTo}
        </span>
        {editButton(job.id, "dateTo")} {"\u00A0 to  \u00A0"}
        <span
          className="date"
          id={`job-${job.id}-dateFrom`}
          data-text={job.dateFrom}
        >
          {job.dateFrom}
        </span>
        {editButton(job.id, "dateFrom")}
      </div>
      <div className="jobInfo">
        <div className="companyInfo">
          <span
            className="positionTitle"
            id={`job-${job.id}-positionTitle`}
            data-text={job.positionTitle}
          >
            {job.positionTitle}
          </span>
          {editButton(job.id, "positionTitle")} at{" "}
          <span
            className="companyName"
            id={`job-${job.id}-companyName`}
            data-text={job.companyName}
          >
            {job.companyName}
          </span>
          {editButton(job.id, "companyName")}
        </div>

        <ItemTasks tasks={job.duties} editTask={editDuty} show={show} />
      </div>
    </div>
  );
};
export default JobInfo;
