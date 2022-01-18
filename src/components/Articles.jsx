import React from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";

const Articles = () => {
    const queryClient = useQueryClient();
    const query = useQuery('articles', getArticles);
    const mutation = useMutation(postArticle, {
        onSuccess: () => {
            queryClient.invalidateQueries('articles');
        },
    })

    async function getArticles() {
        const response = await axios.get('http://localhost:1337/api/articles?populate=cover');
        console.log('GET: ', response.data);
        return response.data;
    }

    function postArticle(newArticle) {
        return axios.post('http://localhost:1337/api/articles', newArticle);
    }

    if (query.isLoading) {
        return <span>Loading...</span>
    }

    if (query.isError) {
        return <span>Error: {query.error.message}</span>
    }

    return (
        <div>
            <ul>
                {query.data.data.map(article =>
                    <li key={article.id}>
                        <p>{article.attributes.title}</p>
                        <p>{article.attributes.body}</p>
                    </li>
                )}
            </ul>
            <button onClick={() => {
                mutation.mutate({
                    data:
                        {
                            title: 'New Article title',
                            body: 'Here some body of the new article'
                        }
                })
            }}>Add Article
            </button>
        </div>
    );
};

export default Articles;