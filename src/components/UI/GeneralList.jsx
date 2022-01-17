import React from 'react';
import './GeneralList.css'

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