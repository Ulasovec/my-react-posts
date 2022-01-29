import React from 'react';
import './GeneralItem.css'

/**
 * Переиспользуемый компонент для рендера произвольного объекта.
 * Рендерит только поля самого верхнего уровня типа String или Number.
 * Хорошо использовать в качестве тестовой заглушки.
 * @param genItem
 * @returns {JSX.Element}
 * @constructor
 */
const GeneralItem = ({genItem}) => {
    return (
        <div className="generalItem">
            {
                Object.entries(genItem)
                    .filter(([key, value]) => typeof value === 'string' || typeof value === 'number')
                    .map(([key, value]) =>
                        <p key={key}><strong>{key}</strong>: {value}</p>
                    )
            }
        </div>
    );
};

export default GeneralItem;