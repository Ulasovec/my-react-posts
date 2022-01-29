import React from 'react';
import classes from "./MyButton.module.css";

/**
 * Переиспользуемый UI-компонент для создания пользовательской кнопки.
 * Демонстрирует:
 * - использование модулей CSS;
 * - использование пропса children и других пропсов для передачи в дочерний элемент.
 * @param children
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;