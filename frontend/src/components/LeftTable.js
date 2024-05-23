import React from 'react';

const LeftTable = () => {
  return (
    <div className="table-container">
      <h2>Left Table</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
          <tr>
            <td>Data 3</td>
            <td>Data 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeftTable;
