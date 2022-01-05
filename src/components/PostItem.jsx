import React from 'react';
import './PostItem.css';

const PostItem = ({post, deletePost}) => {
    return (
        <div className="postItem">
            <div className="postItem__content">
                <p>{new Date(post.id).toLocaleDateString()}</p>
                <p><strong>{post.title}</strong></p>
                <p>{post.body}</p>
            </div>
            <button onClick={() => deletePost(post)}>Delete</button>
        </div>
    );
};

export default PostItem;