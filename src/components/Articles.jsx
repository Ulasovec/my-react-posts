import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import './Articles.css';
import StarRating from "./UI/StarRating";
import Header from "./Header/Header";

const Articles = () => {
    const queryClient = useQueryClient();
    const query = useQuery('articles', getArticles);
    const mutation = useMutation(postArticle, {
        onSuccess: () => {
            queryClient.invalidateQueries('articles');
        },
    });
    const mutationDelete = useMutation(deleteArticle, {
        onSuccess: () => {
            queryClient.invalidateQueries('articles');
        },
    });
    const [files, setFiles] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    async function getArticles() {
        const response = await axios.get('http://localhost:1337/api/articles?populate=cover');
        console.log('GET: ', response.data);
        return response.data;
    }

    function postArticle(newArticle) {
        return axios.post('http://localhost:1337/api/articles', newArticle);
    }

    function deleteArticle(id) {
        return axios.delete(`http://localhost:1337/api/articles/${id}`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files.cover', files[0]);
        const myData = { title, body };
        formData.append('data', JSON.stringify(myData));
        mutation.mutate(formData);
    }

    if (query.isLoading) {
        return <span>Loading...</span>
    }

    if (query.isError) {
        return <span>Error: {query.error.message}</span>
    }

    return (
        <div className="articles">
            <Header/>
            <h2>Articles from strapi-backend</h2>
            <ul>
                {query.data.data.map(article =>
                    <li key={article.id} className="article__item">
                        <p>id: {article.id}</p>
                        <p>Заголовок: {article.attributes.title}</p>
                        <p>Описание: {article.attributes.body}</p>
                        <p>
                            {article.attributes?.cover?.data?.attributes?.url
                                ? <img width="20%" src={`http://localhost:1337${article.attributes?.cover?.data?.attributes?.url}`}/>
                                : null
                            }
                        </p>
                        <div><StarRating totalStars={5} id={article.id}/></div>
                        <button onClick={() => mutationDelete.mutate(article.id)}>Delete</button>
                    </li>
                )}
            </ul>
            <h3>Добавление статей</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Заголовок..." value={title} onChange={e => setTitle(e.target.value)}/>
                <input type="text" placeholder="Описание..." value={body} onChange={e => setBody(e.target.value)}/>
                <input type="file" name="cover" onChange={e => setFiles(e.target.files)}/>
                <button type="submit">Добавить статью с файлом</button>
            </form>
            <button onClick={() => {
                mutation.mutate({
                    data:
                        {
                            title: 'New Article title',
                            body: 'Here some body of the new article'
                        }
                })
            }}>Добавть стандартную статью
            </button>
        </div>
    );
};

export default Articles;