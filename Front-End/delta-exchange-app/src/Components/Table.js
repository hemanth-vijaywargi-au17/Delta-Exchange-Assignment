import React from "react";
import { useDispatch } from "react-redux";
import { removeMember } from "../Slices/userSlice";
import TableRow from "./TableRow";


function Table({ rows }) {
  const dispatch = useDispatch();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return <TableRow {...row} remove={() => {
              dispatch(removeMember(row._id));
            }} key={row._id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
