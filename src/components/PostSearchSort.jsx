import React, {useEffect, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import axios from "axios";
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/modal/MyModal";
import PostForm from "./PostForm";
import SearchSortForm from "./SearchSortForm";
import PostList from "./PostList";

/**
 * Demo-компонент, используемый для страницы <PostsPage/>.
 * Демонстрирует получение из фейк-бекенда, удаление, добавление постов.
 * Использует:
 * - переиспользуемый пользовательский хук useFetching();
 * - переиспользуемый компонент <SearchSortForm/>;
 * - переиспользуемый пользовательский хук usePosts() для сортировки и фильтрации;
 * - собственные UI-компоненты <MyButton>, <MyModal>.
 * Демонстрирует:
 * - передачу данных и колбеков для добавления и удаления постов через props;
 * - использование модального окна для формы при создании нового поста;
 * - сортировку и фильтрацию постов.
 * @returns {JSX.Element}
 * @constructor
 */
const PostSearchSort = () => {

    const [posts, setPosts] = useState([{id: 1, title: 'First post', body: 'Body of post'}]);
    const [filter, setFilter] = useState({sortBy: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndFilteredPosts = usePosts(posts, filter.sortBy, filter.query);

    // useFetching - хук-обертка для callback()
    // axios выбрасывает исключение даже при кодах возврата типа 404 (страница не найдена)
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
        setPosts(response.data);
    });

    // Функцию-обертку вокруг callback, возвращенную хуком useFetching, надо явно вызывать:
    useEffect(fetchPosts, []);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts])
        setModal(false);
    };
    const deletePost = (delPost) => {
        setPosts(posts.filter(post => post.id !== delPost.id))
    }

    return (
        <div>
            <h3>Посты - Получение, добавление, удаление, поиск и сортировка</h3>
            {/*<button onClick={fetchPosts}>Добавить посты</button>*/}
            <MyButton onClick={() => setModal(true)}>Добавить новость</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm addPost={addPost}/>
            </MyModal>
            <SearchSortForm filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Произошла ошибка: {postError}</h1>
            }
            {isPostLoading
                ? <div><h2>Loading...</h2></div>
                : <PostList posts={sortedAndFilteredPosts} deletePost={deletePost}/>
            }
        </div>
    );
};

export default PostSearchSort;