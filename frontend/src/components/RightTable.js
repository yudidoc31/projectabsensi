import React from 'react';

const RightTable = () => {
  return (
    <div className="table-container">
      <h2>Right Table</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data A</td>
            <td>Data B</td>
          </tr>
          <tr>
            <td>Data C</td>
            <td>Data D</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RightTable;
