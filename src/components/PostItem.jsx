import React from 'react';
import './PostItem.css';
import {useNavigate} from "react-router-dom";

const PostItem = ({post, deletePost}) => {
     const navigate = useNavigate();

    return (
        <div className="postItem">
            <div className="postItem__date">
                <strong>{new Date(post.id).toLocaleDateString()}</strong>
            </div>
            <div className="postItem__content">
                <strong>{`${post.id}. ${post.attributes?.title}`}</strong>
                <div>
                    {post.attributes?.body}
                </div>
            </div>
            <div className="postItem__btn">
                <button onClick={() => deletePost(post)}>Delete</button>
                <button onClick={() => navigate(`/posts/${post.id}`)}>Open</button>
            </div>
        </div>
    );
};

export default PostItem;