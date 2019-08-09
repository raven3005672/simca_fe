import React from 'react';
import './index.scss';

export default class Hello extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="Hello">
            Hello {this.props.name}
        </div>
    }
}