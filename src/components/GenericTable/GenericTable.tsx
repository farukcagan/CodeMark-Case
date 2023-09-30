import React from "react";
import "./Table.css"
interface TableProps {
  headers: string[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="sticky-header bg-light">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.id}>
            <td>
              <img src={row.image} alt="" className="user-profile" />
            </td>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.age}</td>
            <td>{row.gender}</td>
            <td>{row.email}</td>
            <td>{row.phone}</td>
            <td>{row.birthDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
