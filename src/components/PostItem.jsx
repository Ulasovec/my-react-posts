import React from 'react';
import './PostItem.css';

const PostItem = ({post, deletePost}) => {
    return (
        <div className="postItem">
            <div className="postItem__date">
                <strong>{new Date(post.id).toLocaleDateString()}</strong>
            </div>
            <div className="postItem__content">
                <strong>{post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="postItem__btn">
                <button onClick={() => deletePost(post)}>Delete</button>
            </div>
        </div>
    );
};

export default PostItem;