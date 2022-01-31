import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import './Articles.css';
import {useNavigate} from "react-router-dom";
import {usePosts} from "../hooks/usePosts";
import SearchSortForm from "./SearchSortForm";
import StarRating from "./UI/rating/StarRating";

/**
 * Demo-компонент для страницы <ArticlesPage/> (http://localhost:3000/demos/articles),
 * демонстрирующий работу с back-end "strapi v4".
 * Запрашивает список статей, удаляет и создает новую статью с картинкой.
 * Использует:
 * - библиотеку "react-query";
 * - пользовательский хук usePosts() для сортировки и фильтрации списка статей;
 * - переиспользуемый компонент <SearchSortForm>.
 * Демонстрирует:
 * - отправку файла с картинкой, привязанной к новой статье, на back-end strapi.
 * @returns {JSX.Element}
 * @constructor
 */
const Articles = () => {
    // React Query
    const queryClient = useQueryClient();
    const query = useQuery(['articles'], getArticles, {
        initialData: {data: []}
    });
    const mutationCreate = useMutation(postArticle, {
        onSuccess: () => {
            queryClient.invalidateQueries(['articles']);
        },
    });
    const mutationDelete = useMutation(deleteArticle, {
        onSuccess: () => {
            queryClient.invalidateQueries(['articles']);
        },
    });
    const mutationMod = useMutation(modifyArticleRating);

    // Состояния для управляемой формы создания новой статьи
    const [files, setFiles] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // Навигация react-router-dom
    const navigate = useNavigate();

    // Состояние для сортировки и фильтрации
    const [filter, setFilter] = useState({sortBy: '', query: ''});
    // Пользовательский хук, сортирующий и фильтрующий массив объектов
    const sortedAndFilteredArticles = usePosts(
        query.data.data, filter.sortBy, filter.query, 'attributes.body'
    );

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

    function modifyArticleRating({id, rating}) {
        return axios.put(`http://localhost:1337/api/articles/${id}`,
            {data: {rating: rating}}
        );
    }

    // Отправка новой статьи с картинкой на бекенд
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files.cover', files[0]); // !!! связка с полем 'cover'
        const myData = {title, body};
        formData.append('data', JSON.stringify(myData));
        mutationCreate.mutate(formData);
    }

    // Render
    if (query.isLoading) {
        return <span>Loading...</span>
    }

    if (query.isError) {
        return <span>Error: {query.error.message}</span>
    }

    return (
        <div className="articles">
            <div>
                <h2>Articles from strapi-backend</h2>
                {/*Переиспользуемый компонент SearchSortForm*/}
                <SearchSortForm
                    filter={filter}
                    setFilter={setFilter}
                    sortSelectOptions={[
                        {value: 'attributes.title', name: 'По заголовку'},
                        {value: 'attributes.body', name: 'По описанию'},
                    ]}
                />
                <ul className="article__list">
                    {sortedAndFilteredArticles.map(article =>
                        <li key={article.id} className="article__item">
                            <p>id: {article.id}</p>
                            <p>Заголовок: {article.attributes.title}</p>
                            <p>Описание: {article.attributes.body}</p>
                            <p>
                                {article.attributes?.cover?.data?.attributes?.url
                                    ? <img width="20%"
                                           src={`http://localhost:1337${article.attributes?.cover?.data?.attributes?.url}`}/>
                                    : null
                                }
                            </p>
                            <StarRating
                                rating={article.attributes.rating}
                                onChange={(rating) =>
                                    mutationMod.mutate({id: article.id, rating: rating})
                                }
                            />
                            <button onClick={() => mutationDelete.mutate(article.id)}>Delete</button>
                            <button onClick={() => navigate(`${article.id}`)}>Open</button>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <h3>Добавление статей c файлом</h3>
                <form className="article__form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Заголовок..." value={title}
                           onChange={e => setTitle(e.target.value)}/>
                    <input type="text" placeholder="Описание..." value={body} onChange={e => setBody(e.target.value)}/>
                    <input type="file" name="cover" onChange={e => setFiles(e.target.files)}/>
                    <button type="submit">Добавить статью с файлом</button>
                </form>
            </div>
            <div>
                <h3>Добавление стандартной статьи</h3>
                <button onClick={() => {
                    mutationCreate.mutate({
                        data:
                            {
                                title: 'New Article title',
                                body: 'Here some body of the new article'
                            }
                    })
                }}>Добавть стандартную статью
                </button>
            </div>
        </div>
    );
};

export default Articles;