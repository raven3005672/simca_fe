import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './components/Hello/index';

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