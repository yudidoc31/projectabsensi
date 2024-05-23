import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Sesuaikan dengan lokasi file Login.jsx
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// ReactDOM.render(
//   <Provider store={store}>
//     <Login />
//   </Provider>,
//   document.getElementById('root')
// );
