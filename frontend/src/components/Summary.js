import React, { useEffect } from 'react';
import Switch from '@mui/material/Switch';

const Summary = (props) => {

  useEffect(() => console.log(props), []);

  return (
    <div className="summary-container">
      <p>Jumlah mahasiswa: {props.data.mahasiswaCount}</p>
      { props.isPagi ? (
        <>
          <p>Jumlah mahasiswa yang hadir: {props.data.pagi?.countHadir || "0"}</p>
          <p>Jumlah mahasiswa yang tidak hadir: {props.data.pagi?.countTidakHadir || "0"}</p>
        </>
      ) : (
        <>
          <p>Jumlah mahasiswa yang hadir: {props.data.sore?.countHadir || "0"}</p>
          <p>Jumlah mahasiswa yang tidak hadir: {props.data.sore?.countTidakHadir || "0"}</p>
        </>
      )}
    </div>
  );
};

export default Summary;
