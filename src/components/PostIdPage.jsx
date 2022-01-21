import React from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import Fetch from "./API/Fetch";
import PostList from "./PostList";

const PostIdPage = () => {
    const params = useParams()
console.log(params);

    return (
        <div>


            <h1>Страница номер:{`${params.id}`}</h1>
            <Fetch
                uri={`http://localhost:1337/api/posts/${params.id}`}
                renderSuccess={data => (
                    <>
                        <h2>{data.data.attributes.title}</h2>
                        <strong>{data.data.attributes.body} </strong>
                    </>)}
            />
        </div>
    );
};

export default PostIdPage;