import React from 'react';
import { useNavigate } from "react-router-dom";
import './PostItem.css';

const PostItem = ({post, deletePost}) => {
    const navigate = useNavigate();
    return (
        <div className="postItem">
            <div className="postItem__date">
                <strong>{new Date(post.id).toLocaleDateString()}</strong>
            </div>
            <div className="postItem__content">
                <strong>{`${post.id}. ${post.title}`}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="postItem__btn">
                <button onClick={() => deletePost(post)}>Delete</button>
                <button onClick={() => navigate(`${post.id}`)}>Open</button>
            </div>
        </div>
    );
};

export default PostItem;