import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Routing from './components/Routing'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Routing>
      <App />
    </Routing>
  </React.StrictMode>
);

