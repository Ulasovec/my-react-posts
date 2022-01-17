import React, {useState} from 'react';
import './SearchSortForm.css';
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

const SearchSortForm = ({filter, setFilter}) => {

    return (
        <div className="searchSortForm">
            <h2>Search and Sort</h2>
            <MySelect
                value={filter.sortBy}
                onChange={newSortBy => setFilter({...filter, sortBy: newSortBy})}
                defaultValue="Без сортировки"
                options={[
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' },
                    // { value: 'id', name: 'По дате' }
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