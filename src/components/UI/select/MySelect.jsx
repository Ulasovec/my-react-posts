import React from 'react';

/**
 * Переиспользуемый UI-компонент.
 * Используется для управляемых форм (props: value, onChange - для состояния в родительском компоненте).
 * Пример использования можно найти в <SearchSortForm/>
 * @param options array - [
 *                     { value: 'title', name: 'По названию' },
 *                     { value: 'body', name: 'По описанию' },
 *                 ]
 * @param defaultValue string - отображаемое значение по-умолчанию (при value='').
 * @param value - текущий выбранный пункт (состояние в родительском компоненте).
 * @param onChange - колбек для смены состояния в родительском компоненте.
 * @returns {JSX.Element}
 * @constructor
 */
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select value={value} onChange={(event) => onChange(event.target.value)}>
            <option value="">{defaultValue}</option>
            {
                options.map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                )
            }
        </select>
    );
};

export default MySelect;