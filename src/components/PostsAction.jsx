import React from 'react';
import {useNavigate} from "react-router-dom";


const PostsAction = ({item,deletePost}) => {
    const navigate = useNavigate();
    return (
        <div>

            <h2>{item.id}.{item.title}</h2>
            <p>{item.body}</p>
            <button onClick={()=> navigate(`/posts/${item.id}`)}>Открыть</button>
            <button onClick={()=> deletePost(item) }>Удалить</button>
        </div>
    );
};

export default PostsAction;