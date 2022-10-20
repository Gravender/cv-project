import React from "react";
import JobInfo from "./JobInfo";
const PracExperience = (props) => {
  const { workExperience, removeJob, show } = props;
  const onDelete = (id) => {
    const filteredJobs = workExperience.filter((job) => job.id !== id);
    removeJob(filteredJobs);
  };
  const button = (id) => {
    if (show) {
      return (
        <div>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      );
    }
    return null;
  };
  const deleteDuty = (id, list) => {
    const newJobs = workExperience.map((job) => {
      if (job.id === id) {
        return { ...job, duties: list };
      }
      return { ...job };
    });
    removeJob(newJobs);
  };
  const editJob = (id, newJob) => {
    const newJobs = workExperience.map((job) => {
      if (job.id === id) {
        return { ...newJob };
      }
      return { ...job };
    });
    removeJob(newJobs);
  };
  return (
    <div className="workExperience">
      <h2>Work Experience</h2>
      {workExperience.map((job) => {
        return (
          <div
            key={job.id}
            className={show ? "jobParent editing" : "jobParent"}
          >
            <JobInfo
              job={job}
              removeDuty={(list) => deleteDuty(job.id, list)}
              editJob={(editedJob) => editJob(job.id, editedJob)}
              show={show}
            ></JobInfo>
            {button(job.id)}
          </div>
        );
      })}
    </div>
  );
};
export default PracExperience;
