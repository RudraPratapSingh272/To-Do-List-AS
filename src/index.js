import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* Place the entire content within the centered container */}
    <div className="centered-container">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
