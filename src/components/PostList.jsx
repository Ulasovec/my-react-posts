import React from 'react';
import PostItem from "./PostItem";
import './PostList.css'

const PostList = ({posts}) => {
    return (
        <div className="postList">
            <h2>Post List</h2>
            {
                posts.map(post => <PostItem id={post.id} post={post} />)
            }
        </div>
    );
};

export default PostList;