import React from "react";
const EditForm = () => {
  let editForm = (
    <div id="editFormDiv" style={{ display: "none" }}>
      <form id="editForm">
        <input type="text" id="editFormText" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
  return editForm;
};
export default EditForm;
