import React from 'react';
import classes from './MyModal.module.css';

/**
 * Переиспользуемый UI-компонент для создания модального окна.
 * Демонстрирует:
 * - использование модулей CSS;
 * - программное добавление CSS-классов в элементы;
 * - использование пропса children.
 * @param children
 * @param visible
 * @param setVisible
 * @returns {JSX.Element}
 * @constructor
 */
const MyModal = ({children, visible, setVisible}) => {
    const rootClasses = [classes.myModal];

    if(visible) rootClasses.push(classes.active);

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;