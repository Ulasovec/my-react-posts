import React from 'react';

const NewPostsAction = ({item}) => {
    return (
        <div>
            <h2>{item.id}.{item.title}</h2>
            <p>{item.body}</p>
        </div>
    );
};

export default NewPostsAction;