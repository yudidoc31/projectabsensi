import React from 'react';
import axios from "axios";

const Table = (props) => {

  const handleEdit = () => {
    
  }

  const handleDelete = async () => {
    // const response = await axios
  }

  return (
    <div className="table-container">
      <h2>Mahasiswa{props.isHadir ? "" : " Tidak"} Hadir</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.mahasiswas?.map((mahasiswa, index) =>
            <tr key={index}>
              <td>{mahasiswa.nama}</td>
              <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
