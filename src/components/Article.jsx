import React from 'react';
import {useQuery} from "react-query";
import axios from "axios";

const Article = ({id}) => {
    const query = useQuery(['article', id], async () => {
        const response = await axios.get(`http://localhost:1337/api/articles/${id}?populate=cover`);
        //console.log('GET Article: ', response.data);
        return response.data;
    });

    if (query.isLoading) return <span>Loading...</span>;
    if (query.isError) return <span>Error: {query.error.message}</span>;

    const {title, body, createdAt} = query.data.data.attributes;
    const url = query.data.data.attributes?.cover?.data?.attributes?.url;
    const imageName = query.data.data.attributes?.cover?.data?.attributes?.name;

    return (
        <div>
            <p>id: {id}</p>
            <p>Заголовок: {title}</p>
            <p>Описание: {body}</p>
            <p>Создана: {createdAt}</p>
            {url ? <img width="20%" src={`http://localhost:1337${url}`}/> : null}
            {imageName ? <p>Имя файла: {imageName}</p> : null }
        </div>
    );
};

export default Article;