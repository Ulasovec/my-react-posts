import React from 'react';
import './GeneralList.css'

/**
 * Переиспользуемый компонент для рендера массива произвольных объектов.
 * Хорошо использовать в виде тестовой заглушки.
 * @param items array - массив объектов, которые надо отренедрить списком;
 * @param renderItem function - функция для рендера элемента массива.
 * @returns {JSX.Element}
 * @constructor
 */
const GeneralList = ({items, renderItem}) => {
    return (
        <div className="generalList">
            <h2>General List</h2>
            {
                Array.isArray(items)
                    ? items.map(item => <div key={item.id}>{renderItem(item)}</div>)
                    : ''
            }
        </div>
    );
};

export default GeneralList;