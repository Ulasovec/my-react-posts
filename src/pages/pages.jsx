import React from 'react';
import {useParams} from "react-router-dom";
import Articles from "../components/Articles";
import PostSearchSort from "../components/PostSearchSort";
import Fetch from "../components/API/Fetch";
import GeneralList from "../components/GeneralList";
import GeneralItem from "../components/GeneralItem";
import PostListInfinity from "../components/PostListInfinity";
import PostItem from "../components/PostItem";

export function About() {
    return (
        <div>
            <h1>О нас</h1>
            <p>Мы занимаемся front-end разработкой.</p>
            <p>Keywords: HTML, CSS, JavaScript, React</p>
        </div>
    );
};

export function Contacts() {
    return (
        <div>
            <h1>Контакты</h1>
        </div>
    );
};

export function DemosIndexPage() {
    return (
        <div>
            <h2>Demos Index Page</h2>
            <p>В этом разделе представлены демонстрации использования различных технологий React.</p>
        </div>
    );
}

export function ArticlesPage() {
    return (
        <div>
            <h2>Демонстрация CRUD - Articles</h2>
            <Articles/>
        </div>
    );
}

export function ArticlePage() {
    const {articleId} = useParams();
    return (
        <div>
            Article Page ID: {articleId}
        </div>
    );
}

export function PostsPage() {
    return (
        <div>
            <h2>Post Page (with Sort and Search)</h2>
            <ul style={{padding: "15px"}}>
                <li>Используются собственные хуки: usePosts(), useFetching(),</li>
                <li>собственный компонент модального окна,</li>
                <li>собственные компоненты форм и UI-компоненты,</li>
                <li>стандартные хуки useMemo(), useEffect(), etc...</li>
            </ul>
            <PostSearchSort/>
        </div>
    );
}

export function PostPage() {
    const {postId} = useParams();
    return (
        <Fetch
            uri={`https://jsonplaceholder.typicode.com/posts/${postId}`}
            renderSuccess={data => <GeneralItem genItem={data}/>}
        />
    );
}

export function FetchPage() {
    return (
        <div>
            <h2>Страница демонстрации компонента Fetch</h2>
            <p>Получение и рендер данных с помощью компонента Fetch
                (внутри свой хук useFetch())</p>
            {/*Рендер списка произвольных компонентов*/}
            <Fetch
                uri={'https://jsonplaceholder.typicode.com/todos?_limit=5'}
                renderSuccess={data => <GeneralList items={data} renderItem={item => <GeneralItem genItem={item}/>}/>}
            />
        </div>
    );
}

export function InfinityPage() {
    return (
        <div>
            <h2>Страница демонстрации бесконечной прокрутки</h2>
            <p>Получение и рендер данных происходит с помощью компонента React Query.</p>
            {/*Рендер списка произвольных компонентов*/}
            <PostListInfinity/>
        </div>
    );
}
