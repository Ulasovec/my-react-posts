import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import PostsAction from "./PostsAction";
import NewPostsAction from "./NewPostsAction";

const PostAction = () => {
    const query = useQuery('postAction', getPost);
    const [posts,setPost]=useState([query.data]);
    const LastElement=useRef();
    const observer=useRef();

    useEffect(()=> {
        var callback = function(entries, observer) {
            if (entries[0].isIntersecting){
                console.log('Див в зоне видимости');
                 setPost([...posts,...query.data]);
                console.log(posts);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(LastElement.current);
    },[]);

    async function getPost() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        // console.log('GET: ', response.data);
        return response.data;
    }
    if (query.isLoading) {
        return <span>Loading...</span>
    }

    if (query.isError) {
        return <span>Error: {query.error.message}</span>
    }




    return (
        <div>
            {query.data.map(item => <PostsAction key={item.id} item={item} ref={LastElement}/>)}
            {posts.map(item => <NewPostsAction key={item.id} item={item}/>)}
            <div style={{height:20, background:'red' }} ref={LastElement}> </div>

        </div>
    );
};

export default PostAction;