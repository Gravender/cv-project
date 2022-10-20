import React from "react";
import EducationInfo from "./EducationInfo";
const EduExperience = (props) => {
  const { eduExperience, removeEducation, show } = props;
  const onDelete = (id) => {
    const filteredJobs = eduExperience.filter(
      (education) => education.id !== id
    );
    removeEducation(filteredJobs);
  };
  const editEducation = (id, newEducation) => {
    const newEdu = eduExperience.map((education) => {
      if (education.id === id) {
        return { ...newEducation };
      }
      return { ...education };
    });
    removeEducation(newEdu);
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
  return (
    <div className="education">
      <h2>Education</h2>
      {eduExperience.map((education) => {
        return (
          <div key={education.id} className={show ? "editing" : ""}>
            <EducationInfo
              education={education}
              show={show}
              editEducation={(editedEducation) =>
                editEducation(education.id, editedEducation)
              }
            ></EducationInfo>
            {button(education.id)}
          </div>
        );
      })}
    </div>
  );
};
export default EduExperience;
