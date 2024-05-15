const { createElement } = require('react');
const { renderToString } = require('react-dom/server');

function MahasiswaList({ mahasiswa }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Daftar Mahasiswa</title>
        {/* Bootstrap CSS */}
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              padding: 20px;
            }
            h1 {
              margin-bottom: 20px;
            }
            .mahasiswa-list {
              list-style: none;
              padding-left: 0;
            }
            .mahasiswa-item {
              border-bottom: 1px solid #dee2e6;
              padding: 10px 0;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1 className="mb-4">Daftar Mahasiswa</h1>
          <ul className="mahasiswa-list">
            {mahasiswa.map((m, index) => (
              <li key={index} className="mahasiswa-item">
                {m.nim} - {m.username} - {m.jurusan}
              </li>
            ))}
          </ul>
          {/* Button login */}
          <a href="/login" className="btn btn-primary mt-4">
            Login
          </a>
        </div>
      </body>
    </html>
  );
}

module.exports = MahasiswaList;
