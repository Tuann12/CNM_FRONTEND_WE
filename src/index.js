import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import GlobalStyles from './GlobalStyles/GlobalStyles';
import { GlobalDataProvider } from './GlobalDataProvider';

ReactDOM.render(
    <Router>
        <GlobalStyles>
            <GlobalDataProvider>
                <App />
            </GlobalDataProvider>{' '}
        </GlobalStyles>
    </Router>,
    document.getElementById('root'),
);
