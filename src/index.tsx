import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'
import CheckUserByToken from './components/CheckUserByToken';
import Routing from './components/Routing'
import { store } from './store/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CheckUserByToken>
        <Routing>
          <App />
        </Routing>
      </CheckUserByToken>
    </Provider>
  </React.StrictMode>
);

