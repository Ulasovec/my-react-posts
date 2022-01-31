import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import PostsAction from "./PostsAction";
import NewPostsAction from "./NewPostsAction";
import Header from "./Header/Header";
const PostAction = () => {
    const [limit, setLimit] = useState(5);
    const query = useQuery(['postAction', limit], () => getPost(limit) , { keepPreviousData : true });
    const lastElement=useRef();
    const observer=useRef();


    useEffect(()=> {
        if (query.isFetching) return;
        if (observer.current) observer.current.disconnect();
        var callback = function(entries, observer) {
            if (entries[0].isIntersecting && limit <= 100){
                console.log('Див в зоне видимости');
                //setPost([...posts,...query.data]);
                setLimit(limit + 5);
                console.log(limit);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    },[query.isFetching]);

    async function getPost(limit) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        // console.log('GET: ', response.data);

        return response.data;
    }

        const deletePost = (delPost) => {
            console.log('Delete',delPost.id)
        }

    if (query.isLoading) {
        return <span>Loading...</span>
    }

    if (query.isError) {
        return <span>Error: {query.error.message}</span>
    }




    return (
        <div>
            <Header/>
            {query.data.map(item => <PostsAction key={item.id} item={item} ref={lastElement} deletePost={deletePost}/>)}
            {/*{posts.map(item => <NewPostsAction key={item.id} item={item}/>)}*/}
            <div style={{height:20, background:'red' }} ref={lastElement}> </div>

        </div>
    );
};

export default PostAction;