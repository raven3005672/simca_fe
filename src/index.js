import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello/index1';

import './styles/index.scss';

const App = () => {
    return <div>
        <Hello name="testname" />
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);