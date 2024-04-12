import React, { useState, useEffect } from 'react';
import CalculatorButton from './CalculatorButton';
import './App.css'

const Calculator = () => {
    const [expression, setExpression] = useState('0');
    const [enterPressed, setEnterPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (/[0-9]/.test(key)) {
                handleNumberInput(key);
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                handleOperatorInput(key);
            } else if (key === '.') {
                handleDecimalInput();
            } else if (key === 'Enter') {
                setEnterPressed(true);
            } else if (key === 'Backspace') {
                handleBackspace();
            } else if (key === 'Escape') {
                setExpression('');
            } else if (key === '%') {
                handleButtonClick('%');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (enterPressed) {
            handleButtonClick('=');
            setEnterPressed(false);
        }
    }, [enterPressed]);

    const handleNumberInput = (number) => {
        setExpression((prevExpression) => {
            if (prevExpression === '0' || prevExpression === 'Error') {
                return number;
            } else {
                return prevExpression + number;
            }
        });
    };

    const handleOperatorInput = (operator) => {
        setExpression((prevExpression) => prevExpression + operator);
    };

    const handleDecimalInput = () => {
        setExpression((prevExpression) => {
            const lastNumberIndex = prevExpression.split(/[\+\-\*\/]/).pop().lastIndexOf('.');
            if (lastNumberIndex === -1) {
                return prevExpression + '.';
            } else {
                return prevExpression;
            }
        });
    };

    const handleBackspace = () => {
        setExpression((prevExpression) => prevExpression.slice(0, -1));
    };

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                const result = evaluateExpression(expression);
                setExpression(result.toString());
            } catch (error) {
                setExpression('Error');
            }
        } else if (value === 'AC') {
            setExpression('');
        } else if (value === '+/-') {
            setExpression((prevExpression) => {
                if (prevExpression.startsWith('-')) {
                    return prevExpression.slice(1);
                } else {
                    return '-' + prevExpression;
                }
            });
        } else if (value === '%') {
            setExpression((prevExpression) => {
                const number = parseFloat(prevExpression);
                return (number / 100).toString();
            });
        } else {
            setExpression((prevExpression) => prevExpression + value);
        }
    };

    const evaluateExpression = (expr) => {
        const result = Function(`'use strict'; return (${expr})`)();
        return parseFloat(result.toFixed(10));
    };

    return (
        <div className="calculator">
            <input
                className="calculator-display"
                type="text"
                value={expression}
                readOnly
            />
            <div className="calculator-buttons">
                <CalculatorButton onClick={handleButtonClick} value="AC" />
                <CalculatorButton onClick={handleButtonClick} value="+/-" />
                <CalculatorButton onClick={handleButtonClick} value="%" />
                <CalculatorButton onClick={handleButtonClick} value="/" orange />
                <CalculatorButton onClick={handleButtonClick} value="7" />
                <CalculatorButton onClick={handleButtonClick} value="8" />
                <CalculatorButton onClick={handleButtonClick} value="9" />
                <CalculatorButton onClick={handleButtonClick} value="*" orange />

                <CalculatorButton onClick={handleButtonClick} value="4" />
                <CalculatorButton onClick={handleButtonClick} value="5" />
                <CalculatorButton onClick={handleButtonClick} value="6" />
                <CalculatorButton onClick={handleButtonClick} value="-" orange />

                <CalculatorButton onClick={handleButtonClick} value="1" />
                <CalculatorButton onClick={handleButtonClick} value="2" />
                <CalculatorButton onClick={handleButtonClick} value="3" />
                <CalculatorButton onClick={handleButtonClick} value="+" orange />

                <CalculatorButton onClick={handleButtonClick} value="0" double />
                <CalculatorButton onClick={handleButtonClick} value="." />
                <CalculatorButton onClick={handleButtonClick} value="=" orange />
            </div>
        </div>
    );
};

export default Calculator;
