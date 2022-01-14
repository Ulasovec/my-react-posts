import './App.css';
import {useEffect, useState} from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import SearchSortForm from "./components/SearchSortForm";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import {useFetching} from "./hooks/useFetching";
import Fetch from "./components/API/Fetch";

function App() {
    const [posts, setPosts] = useState([{id: 1, title: 'First post', body: 'Body of post'}]);
    const [filter, setFilter] = useState({sortBy: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndFilteredPosts = usePosts(posts, filter.sortBy, filter.query);

    // Следующий закоментаренный код ушел в хук usePosts
    /*const sortedPosts = useMemo(
        () => filter.sortBy
            ? [...posts].sort((a, b) => a[filter.sortBy].localeCompare(b[filter.sortBy]))
            : [...posts],
        [filter.sortBy, posts]
    );
    const sortedAndFilteredPosts = useMemo(
        () => sortedPosts.filter(post => post.body.toLowerCase().includes(filter.query.toLowerCase())),
        [filter.query, sortedPosts]
    );*/

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
        <div className="App">
            <h1>Новости</h1>
            {/*<button onClick={fetchPosts}>Добавить посты</button>*/}
            <MyButton onClick={() => setModal(true)}>Добавить новость</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm addPost={addPost}/>
            </MyModal>
            <SearchSortForm filter={filter} setFilter={setFilter}/>
            { postError &&
                <h1>Произошла ошибка: {postError}</h1>
            }
            { isPostLoading
                ? <div><h2>Loading...</h2></div>
                : <PostList posts={sortedAndFilteredPosts} deletePost={deletePost}/>
            }
            <hr style={{margin: '15px'}}/>
            <h2>Через компонент Fetch</h2>

            {/*запрос постов через компонент Fetch
               Посты сразу рендерятся (без сортировки и фильтрации) */}
            <Fetch
                uri={'https://jsonplaceholder.typicode.com/posts?_limit=3'}
                renderSuccess={({data}) => (<PostList posts={data} deletePost={deletePost}/>)}
            />
        </div>
    );
}

export default App;
