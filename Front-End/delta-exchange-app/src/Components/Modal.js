import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember } from "../Slices/userSlice";

function Modal({ close }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("DC United");
  const [status, setStatus] = useState("Active");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      addMember({
        name: name || "Not Specified",
        company: company || "Not Specified",
        status: status || "Not Specified",
        notes: notes || "Not Specified",
      })
    );
    close();
  };

  return (
    <div
      className="modal-background"
      onClick={(e) => {
        close();
      }}
    >
      <div
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-x-btn-container">
          <button onClick={close} className="modal-x-btn">
            X
          </button>
        </div>

        <div className="modal-head">
          <h1>Add Member</h1>
        </div>

        <div className="modal-body">
          <div>
            <div className="form-input-group">
              <label htmlFor="" className="form-input-label">
                Name
              </label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="" className="form-input-label">
                Company
              </label>
              <select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                className="form-input"
              >
                <option value="DC United">DC United</option>
                <option value="Manchester United">Manchester United</option>
                <option value="LA Galaxy">LA Galaxy</option>
              </select>
            </div>
            <div className="form-input-group">
              <label htmlFor="" className="form-input-label">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="form-input"
              >
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="form-input-group">
              <label htmlFor="" className="form-input-label">
                Notes
              </label>
              <input
                type="text"
                className="form-input"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={close} className="modal-btn hover:bg-blue-200">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="modal-btn bg-blue-500 text-white hover:bg-blue-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
