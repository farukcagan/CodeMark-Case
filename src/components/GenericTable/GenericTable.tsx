import React from "react";
import "./Table.css"
interface TableProps {
  headers: string[];
  data: any[];
}

// Table bileşeni, başlık ve verileri içeren bir generic tabloyu oluşturur.

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="table-responsive">
      <table className='w-100 mt-0 table align-middle gs-0 gy-2'>
        <thead className="sticky-header-table">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="bg-light">
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
    </div>

  );
};

export default Table;
