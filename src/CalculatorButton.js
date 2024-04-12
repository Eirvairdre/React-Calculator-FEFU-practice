import React from 'react';

const CalculatorButton = ({ onClick, value, double, orange }) => {
    let classNames = 'calculator-button';
    if (double) {
        classNames += ' double';
    }
    if (orange) {
        classNames += ' orange';
    }
    if (value === 'AC' || value === '+/-' || value === '%') {
        classNames += ' gray';
    }

    return (
        <button className={classNames} onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

export default CalculatorButton;
