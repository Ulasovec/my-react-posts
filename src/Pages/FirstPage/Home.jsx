import React, {useEffect, useState} from 'react';
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/modal/MyModal";
import PostForm from "../../components/PostForm";
import SearchSortForm from "../../components/SearchSortForm";
import PostList from "../../components/PostList";
import Fetch from "../../components/API/Fetch";
import GeneralList from "../../components/GeneralList";
import GeneralItem from "../../components/GeneralItem";
import {usePosts} from "../../hooks/usePosts";
import {useFetching} from "../../hooks/useFetching";
import axios from "axios";
import Header from "../../components/Header/Header";



const Home = () => {
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

            <div className="App">
                <Header/>

                <h1>Новости</h1>
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
                <hr style={{margin: '15px'}}/>
                <h2>Через компонент Fetch</h2>

                {/*запрос постов через компонент Fetch
               Посты сразу рендерятся (без сортировки и фильтрации) */}
                <Fetch
                    uri={'https://jsonplaceholder.typicode.com/posts?_limit=3'}
                    renderSuccess={data => <PostList posts={data} deletePost={deletePost}/>}
                />
                {/*Рендер списка произвольных компонентов*/}
                <Fetch
                    uri={'https://jsonplaceholder.typicode.com/todos?_limit=3'}
                    renderSuccess={data => <GeneralList items={data} renderItem={item => <GeneralItem genItem={item}/>}/>}
                />
                {/*Рендер произвольного объекта (показывает строковые и числовые поля верхнего уровня)*/}
                <GeneralItem genItem={{id: 1, name: 'Ivan', email: 'aa@bb.com'}}/>
                <Fetch
                    uri={'https://jsonplaceholder.typicode.com/users/1'}
                    renderSuccess={data => <GeneralItem genItem={data}/>}
                />
                <h2>Backend Strapi</h2>
                <Fetch
                    uri={'http://localhost:1337/api/articles?populate=cover'}
                    renderSuccess={data => <GeneralList items={data.data} renderItem={item => (
                        <>
                            <GeneralItem genItem={item.attributes}/>
                            {item.attributes?.cover?.data?.attributes?.url
                                ? <img width="30%" src={`http://localhost:1337${item.attributes?.cover?.data?.attributes?.url}`}/>
                                : null
                            }
                        </>
                    )}/>}
                />
        </div>
    );
};

export default Home;