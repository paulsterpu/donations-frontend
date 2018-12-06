import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import './style/css/body.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';

ReactDOM.render((
    <Provider store={createStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
