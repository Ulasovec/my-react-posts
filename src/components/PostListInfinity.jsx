import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import GeneralItem from "./GeneralItem";

const PostListInfinity = () => {
    const [limit, setLimit] = useState(5);
    const query = useQuery(['postAction', limit], () => getPost(limit), {keepPreviousData: true});
    //const [posts,setPost]=useState([query.data]);
    const lastElement = useRef();
    const observer = useRef();

    useEffect(() => {
        if (query.isFetching) return;
        if (observer.current) observer.current.disconnect();
        const callback = function (entries, observer) {
            if (entries[0].isIntersecting && limit <= 100) {
                console.log('Див в зоне видимости');
                //setPost([...posts,...query.data]);
                setLimit(limit + 5);
                console.log(limit);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }, [query.isFetching]);

    async function getPost(limit) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
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
            {query.data.map(item => <GeneralItem key={item.id} genItem={item} ref={lastElement}/>)}
            <div style={{height: 20, background: 'red'}} ref={lastElement}> </div>
        </div>
    );
};

export default PostListInfinity;