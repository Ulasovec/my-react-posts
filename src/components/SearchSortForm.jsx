import React, {useState} from 'react';
import './SearchSortForm.css';
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

/**
 * Переиспользуемый компонент формы для сортировки и поиска
 * @param filter object - объект фильтра, содержащий поля: { sortBy, query }
 * @param setFilter - коллбек для установки нового объекта фильтра
 * @param sortSelectOptions - массив объектов для выбора поля сортировки [{value, name},...]
 * @returns {JSX.Element}
 * @constructor
 */
const SearchSortForm = ({filter, setFilter, sortSelectOptions}) => {

    return (
        <div className="searchSortForm">
            <h2>Search and Sort</h2>
            <MySelect
                value={filter.sortBy}
                onChange={newSortBy => setFilter({...filter, sortBy: newSortBy})}
                defaultValue="Без сортировки"
                options={sortSelectOptions ?? [
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' },
                ]}
            />
            <MyInput
                value={filter.query}
                onChange={(e) => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
        </div>
    );
};

export default SearchSortForm;