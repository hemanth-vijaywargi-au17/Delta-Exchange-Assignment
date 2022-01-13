import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import MultiSelectDropDown from "./MultiSelectDropDown";
import Table from "./Table";
import filterByCompany from "../Utils/filterByCompany";
import sortByStatus from "../Utils/sortByStatus";

function Filter() {
  const { team_members, name } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const [currentList, setCurrentList] = useState(team_members);

  const [companyAll, setCompanyAll] = useState(true);
  const [dcUnited, setDcUnited] = useState(true);
  const [manUnited, setManUnited] = useState(true);
  const [laGalaxy, setLaGalaxy] = useState(true);
  const [companySelections, setCompanySelections] = useState(3);

  const [statusNone, setStatusNone] = useState(true);
  const [active, setActive] = useState(false);
  const [closed, setClosed] = useState(false);
  const [statusSelected, setStatusSelected] = useState("None");

  useEffect(() => {
    if (dcUnited && manUnited && laGalaxy) {
      setCompanyAll(true);
    } else {
      setCompanyAll(false);
    }

    let selection = [];
    let number = 0;
    if (dcUnited) {
      selection.push("dc united");
      number += 1;
    }
    if (manUnited) {
      selection.push("manchester united");
      number += 1;
    }
    if (laGalaxy) {
      selection.push("la galaxy");
      number += 1;
    }
    setCompanySelections(number);

    let newList = filterByCompany(selection, team_members);
    let sortedList = [];
    if (active) {
      sortedList = sortByStatus("active", newList);
      setCurrentList(sortedList);
    } else if (closed) {
      sortedList = sortByStatus("closed", newList);
      setCurrentList(sortedList);
    } else {
      setCurrentList(newList);
    }
  }, [dcUnited, manUnited, laGalaxy, team_members, active, closed, statusNone]);

  return (
    <div>
      <div className="header">
        <h1>Team Members</h1>
        <button
          onClick={() => {
            if (name) {
              setShowModal(true);
            } else {
              alert(
                "You can only add members if signed in, so that we can save the data into your account."
              );
            }
          }}
        >
          Add Member
        </button>
        {name ? null : (
          <div>
            (You can only add members if signed in, so that we can save the data
            into your account.)
          </div>
        )}
      </div>

      {showModal ? (
        <Modal
          close={() => {
            setShowModal(false);
          }}
        />
      ) : null}

      <div className="selectors-box">
        <div>Filter By : </div>
        <MultiSelectDropDown label={`Company (${companySelections})`}>
          <label>
            <input
              type="checkbox"
              checked={companyAll}
              onChange={(e) => {
                setCompanyAll(e.target.checked);
                setDcUnited(e.target.checked);
                setManUnited(e.target.checked);
                setLaGalaxy(e.target.checked);
              }}
            />
            Select all
          </label>

          <label>
            <input
              type="checkbox"
              checked={dcUnited}
              onChange={(e) => {
                setDcUnited(e.target.checked);
              }}
            />
            DC United
          </label>
          <label>
            <input
              type="checkbox"
              checked={manUnited}
              onChange={(e) => {
                setManUnited(e.target.checked);
              }}
            />
            Manchester United
          </label>
          <label>
            <input
              type="checkbox"
              checked={laGalaxy}
              onChange={(e) => {
                setLaGalaxy(e.target.checked);
              }}
            />
            LA Galaxy
          </label>
        </MultiSelectDropDown>
        <div>Sort By : </div>
        <MultiSelectDropDown label={`Status (${statusSelected})`}>
          <label>
            <input
              type="radio"
              checked={statusNone}
              onChange={(e) => {
                setStatusNone(e.target.checked);
                setActive(!e.target.checked);
                setClosed(!e.target.checked);
                setStatusSelected("None");
              }}
            />
            None
          </label>
          <label>
            <input
              type="radio"
              checked={active}
              onChange={(e) => {
                setActive(e.target.checked);
                setStatusNone(!e.target.checked);
                setClosed(!e.target.checked);
                setStatusSelected("Active");
              }}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              checked={closed}
              onChange={(e) => {
                setClosed(e.target.checked);
                setActive(!e.target.checked);
                setStatusNone(!e.target.checked);
                setStatusSelected("Closed");
              }}
            />
            Closed
          </label>
        </MultiSelectDropDown>
      </div>

      <Table rows={currentList} />
    </div>
  );
}

export default Filter;
