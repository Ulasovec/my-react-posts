import React, {useRef} from 'react';
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";

/**
 * Demo-компонент для страницы <ArticlePage/> (http://localhost:3000/demos/articles/:id).
 * Рендерит отдельную статью, запрашивая ее у бекенда.
 * Позволяет модифицировать на бекенде некоторые поля статьи.
 * Использует:
 * - библиотеку react-query.
 * Демонстрирует:
 * - простую неуправляемую форму для отправки данных на бекенд.
 * @param id string - ID-идентификатор статьи.
 * @returns {JSX.Element}
 * @constructor
 */
const Article = ({id}) => {
    const queryClient = useQueryClient();
    const query = useQuery(['articles', id], async () => {
        const response = await axios.get(`http://localhost:1337/api/articles/${id}?populate=cover`);
        //console.log('GET Article: ', response.data);
        return response.data;
    });
    const mutationModify = useMutation((modifiedArticle) =>
            axios.put(`http://localhost:1337/api/articles/${id}`, modifiedArticle), {
            onSuccess: () => {
                queryClient.invalidateQueries(['articles', id]);
            },
        }
    )

    if (query.isLoading) return <span>Loading...</span>;
    if (query.isError) return <span>Error: {query.error.message}</span>;

    // Деструктуризация
    const {title, body, createdAt, updatedAt} = query.data.data.attributes;
    const url = query.data.data.attributes?.cover?.data?.attributes?.url;
    const imageName = query.data.data.attributes?.cover?.data?.attributes?.name;

    return (
        <div>
            {/*простая неуправляемая форма*/}
            <form onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const modData = {
                    data: {
                        title: formData.get('title'),
                        body: formData.get('body')
                    }
                }
                mutationModify.mutate(modData);
            }}>
                <input type="text" name="title" placeholder="title..."/>
                <input type="text" name="body" placeholder="body..."/>
                <button type="submit">Обновить</button>
            </form>
            <p>id: {id}</p>
            <p>Заголовок: {title}</p>
            <p>Описание: {body}</p>
            <p>Создана: {createdAt}</p>
            <p>Обновлена: {updatedAt}</p>
            {url ? <img width="20%" src={`http://localhost:1337${url}`}/> : null}
            {imageName ? <p>Имя файла: {imageName}</p> : null}
        </div>
    );
};

export default Article;