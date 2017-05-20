import React, { Component } from 'react';

class Button extends Component {
    render() {
        const {
            handleClick,
            className = '',
            children
        } = this.props;

        return (
            <button
                onClick={handleClick}
                className={className}
                type="button">
                {children}
            </button>
        );
    }
}

export default Button;