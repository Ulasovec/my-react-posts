import React from 'react';
import './GeneralItem.css'

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