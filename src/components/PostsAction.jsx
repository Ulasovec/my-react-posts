import React from 'react';
import {within} from "@testing-library/react";

const PostsAction = ({item}) => {
    return (
        <div>
            <h2>{item.id}.{item.title}</h2>
            <p>{item.body}</p>

        </div>
    );
};

export default PostsAction;