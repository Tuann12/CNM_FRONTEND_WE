import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import GlobalStyles from './GlobalStyles/GlobalStyles';

ReactDOM.render(
    <Router>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Router>,
    document.getElementById('root'),
);
