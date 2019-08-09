import * as React from 'react';

import './index.scss';

export interface HelloProps {
    name: string
}

export default class Hello extends React.Component<HelloProps, object> {
    render() {
        const {name} = this.props;
        return (
            <div className="Hello">
                Hello {name}
                <h2>yoyoyo</h2>
            </div>
        )
    }
}