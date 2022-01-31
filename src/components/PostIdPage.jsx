import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";

const PostIdPage = () => {
    const params = useParams()
    const queryClient = useQueryClient();
    const query = useQuery('articles', getArticles);
    async function getArticles() {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        return response.data;
    }

    return (
        <div>
            <h1>Номер страницы {params.id}</h1>
            <p>Название статьи: {query?.data?.title}</p>
            <p>Описание статьи: {query?.data?.body}</p>
        </div>
    );
};

export default PostIdPage;