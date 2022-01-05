import React from 'react';
import './PostItem.css';

const PostItem = ({post}) => {
    return (
        <div className="postItem">
            <div className="postItem__content">
                <p><strong>{post.title}</strong></p>
                <p>{post.body}</p>
            </div>
            <button>Delete</button>
        </div>
    );
};

export default PostItem;