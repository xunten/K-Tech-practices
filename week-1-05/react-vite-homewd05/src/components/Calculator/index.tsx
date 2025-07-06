import React, { useState } from 'react';
import styles from './Calculator.module.css';

const operators = ['+', '-', 'x', '÷'] as const;
type Operator = typeof operators[number];

function isOperator(value: string): value is Operator {
  return operators.includes(value as Operator);
}

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
      return;
    }

    if (value === '=') {
      try {
        // Replace custom operators with JS equivalents
        const safeExpr = expression
            .replace(/[x]/g, '*')  
            .replace(/÷/g, '/');
        // Prevent division by zero
        const evalResult = eval(safeExpr);
        if (evalResult === Infinity || evalResult === -Infinity) {
          setResult('Error');
        } else {
          setResult(evalResult.toString());
        }
      } catch {
        setResult('Error');
      }
      return;
    }

    // Prevent multiple decimals in a number
    if (value === '.') {
      const parts = expression.split(/[+\-×÷]/);
      const last = parts[parts.length - 1];
      if (last.includes('.')) return;
    }

    // Prevent two operators in a row
    if (
      isOperator(value) &&
      (expression === '' || isOperator(expression[expression.length - 1]))
    ) {
      return;
    }

    setExpression(prev => prev + value);
    setResult('');
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', 'x',
    '1', '2', '3', '-',
    '0', '.', 'C', '+'
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles.expression}>{expression || '0'}</div>
        <div className={styles.result}>{result}</div>
      </div>
      <div className={styles.buttons}>
        {buttons.map((btn) => (
          <button
            key={btn}
            className={
              isOperator(btn)
                ? styles.operator
                : btn === 'C'
                  ? styles.clear
                  : styles.button
            }
            onClick={() => handleButtonClick(btn)}
            type="button"
          >
            {btn}
          </button>
        ))}
        <button
          className={styles.equal}
          onClick={() => handleButtonClick('=')}
          type="button"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;