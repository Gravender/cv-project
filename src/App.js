import React, { Component } from "react";
import EduExperience from "./components/EduExperience";
import GenInfo from "./components/GenInfo";
import PracExperience from "./components/PracExperience";
import "./css/style.css";
import EditForm from "./form/EditForm";
import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();
    this.handleEditTrue = this.handleEditTrue.bind(this);
    this.handleEditFalse = this.handleEditFalse.bind(this);
    this.state = {
      task: { text: "", id: uniqid() },
      edit: true,
      general: {
        fName: "",
        lName: "",
        email: "",
        phone: "",
      },
      job: {
        positionTitle: "",
        companyName: "",
        dateTo: "",
        dateFrom: "",
        duties: [],
        id: uniqid(),
      },
      education: {
        degreeTitle: "",
        dateOfStudy: "",
        schoolName: "",
        id: uniqid(),
      },
      workExperience: [],
      eduExperience: [],
    };
    this.handleJobChange = this.handleJobChange.bind(this);
  }
  handleEditTrue() {
    this.setState({
      edit: true,
    });
  }
  handleEditFalse() {
    this.setState({
      edit: false,
    });
  }
  handleChange = (key, value) => {
    this.setState({
      general: {
        ...this.state.general,
        [key]: value,
      },
    });
  };
  handleTaskChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
      },
    });
  };
  handleJobChange = (key, value) => {
    this.setState({
      job: {
        ...this.state.job,
        [key]: value,
      },
    });
  };
  handleWorkChange = (list) => {
    this.setState({
      workExperience: list,
    });
  };
  handleEduChange = (list) => {
    this.setState({
      eduExperience: list,
    });
  };
  handledegreeTitleChange = (e) => {
    this.setState({
      education: {
        degreeTitle: e.target.value,
        dateOfStudy: this.state.education.dateOfStudy,
        schoolName: this.state.education.schoolName,
        id: this.state.education.id,
      },
    });
  };
  handleSchooNameChange = (e) => {
    this.setState({
      education: {
        degreeTitle: this.state.education.degreeTitle,
        dateOfStudy: this.state.education.dateOfStudy,
        schoolName: e.target.value,
        id: this.state.education.id,
      },
    });
  };
  handleDateOfStudyChange = (e) => {
    this.setState({
      education: {
        degreeTitle: this.state.education.degreeTitle,
        dateOfStudy: e.target.value,
        schoolName: this.state.education.schoolName,
        id: this.state.education.id,
      },
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    if (this.state.task.text !== "") {
      this.setState({
        job: {
          positionTitle: this.state.job.positionTitle,
          companyName: this.state.job.companyName,
          dateTo: this.state.job.dateTo,
          dateFrom: this.state.job.dateFrom,
          duties: this.state.job.duties.concat(this.state.task),
          id: this.state.job.id,
        },
        task: { text: "", id: uniqid() },
      });
    }
  };
  onSubmitJob = (e) => {
    e.preventDefault();
    if (this.state.job.positionTitle !== "") {
      this.setState({
        workExperience: this.state.workExperience.concat(this.state.job),
        job: {
          positionTitle: "",
          companyName: "",
          dateTo: "",
          dateFrom: "",
          duties: [],
          id: uniqid(),
        },
        task: { text: "", id: uniqid() },
      });
    }
  };
  onSubmitSchool = (e) => {
    e.preventDefault();
    if (this.state.education.degreeTitle !== "") {
      this.setState({
        eduExperience: this.state.eduExperience.concat(this.state.education),
        education: {
          degreeTitle: "",
          dateOfStudy: "",
          schoolName: "",
          id: uniqid(),
        },
      });
    }
  };
  render() {
    const {
      task,
      job,
      education,
      general,
      eduExperience,
      workExperience,
      edit,
    } = this.state;
    let content;
    if (edit) {
      content = (
        <div id="content">
          <h2>What's being worked on</h2>
          <div>
            <div className="form General">
              <h3>General Info</h3>
              <form onSubmit={this.onSubmitSchool}>
                {Object.entries(general).map((property) => {
                  const key = property[0];
                  return (
                    <label key={key} htmlFor={`general-${key}`}>
                      {key}:
                      <input
                        type="text"
                        id={`general-${key}`}
                        value={general[key]}
                        onChange={(e) => this.handleChange(key, e.target.value)}
                      />
                    </label>
                  );
                })}
              </form>
            </div>
            <h3>Current Job</h3>
            <PracExperience
              workExperience={workExperience}
              removeJob={this.handleWorkChange}
              show={true}
            ></PracExperience>
            <form onSubmit={this.onSubmitJob}>
              {Object.entries(job).map((property, i, arr) => {
                const key = property[0];
                let typeInput = "text";
                if (key === "email") {
                  typeInput = "email";
                } else if (key === "dateTo" || key === "dateFrom") {
                  typeInput = "date";
                }
                if (i < arr.length - 2) {
                  return (
                    <label key={key} htmlFor={`job-${key}`}>
                      {key}:
                      <input
                        type={typeInput}
                        id={`job-${key}`}
                        value={job[key]}
                        onChange={(e) =>
                          this.handleJobChange(key, e.target.value)
                        }
                      />
                    </label>
                  );
                }
                return null;
              })}
              <button type="submit">Add Job</button>
            </form>
            <form onSubmit={this.onSubmitTask}>
              <label htmlFor="taskInput">Enter duties</label>
              <input
                onChange={this.handleTaskChange}
                value={task.text}
                type="text"
                id="taskInput"
              />
              <button type="submit">Add Duty</button>
            </form>
          </div>
          <EduExperience
            eduExperience={eduExperience}
            removeEducation={this.handleEduChange}
            show={true}
          ></EduExperience>
          <form onSubmit={this.onSubmitSchool}>
            <label htmlFor="degreeTitleInput">Enter Degree Title</label>
            <input
              onChange={this.handledegreeTitleChange}
              value={education.degreeTitle}
              type="text"
              id="degreeTitleInput"
            />
            <label htmlFor="schoolNameInput">Enter School Name</label>
            <input
              onChange={this.handleSchooNameChange}
              value={education.schoolName}
              type="text"
              id="schoolNameInput"
            />
            <label htmlFor="dateOfStudyInput">Enter date of study</label>
            <input
              onChange={this.handleDateOfStudyChange}
              value={education.dateOfStudy}
              type="text"
              id="dateOfStudyInput"
            />
            <button type="submit">Add Education</button>
          </form>
          <EditForm></EditForm>
          <button onClick={this.handleEditFalse}>Show</button>
        </div>
      );
    } else {
      content = (
        <div>
          <GenInfo
            general={general}
            editGeneral={(key, value) => this.handleChange(key, value)}
            show={false}
          ></GenInfo>
          <PracExperience
            workExperience={workExperience}
            removeJob={this.handleWorkChange}
            show={false}
          ></PracExperience>
          <EduExperience
            eduExperience={eduExperience}
            removeEducation={this.handleEduChange}
            show={false}
          ></EduExperience>
          <button onClick={this.handleEditTrue}>Edit</button>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default App;
