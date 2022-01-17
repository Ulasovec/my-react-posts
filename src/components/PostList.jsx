import React from 'react';
import PostItem from "./PostItem";
import './PostList.css'

const PostList = ({posts, deletePost}) => {
    return (
        <div className="postList">
            <h2>Post List</h2>
            {
                Array.isArray(posts)
                    ? posts.map(post => <PostItem key={post.id} post={post} deletePost={deletePost}/>)
                    : ''
            }
        </div>
    );
};

export default PostList;