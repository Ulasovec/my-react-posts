import React from 'react';
import PostItem from "./PostItem";
import './PostList.css'

const PostList = ({posts, deletePost}) => {
    return (
        <div className="postList">
            <h2>Post List</h2>
            {
                posts.map(post => <PostItem id={post.id} post={post} deletePost={deletePost}/>)
            }
        </div>
    );
};

export default PostList;