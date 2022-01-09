import './App.css';
import {useMemo, useState} from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import SearchSortForm from "./components/SearchSortForm";

function App() {
    const [posts, setPosts] = useState([{id: 1, title: 'First post', body: 'Body of post'}]);
    const [filter, setFilter] = useState({sortBy: '', query: ''});
    const sortedPosts = useMemo(
        () => filter.sortBy
            ? [...posts].sort((a, b) => a[filter.sortBy].localeCompare(b[filter.sortBy]))
            : [...posts],
        [filter, posts]
    );
    const sortedAndFilteredPosts = useMemo(
        () => sortedPosts.filter(post => post.body.toLowerCase().includes(filter.query.toLowerCase())),
        [sortedPosts]
    );
    const addPost = (newPost) => {
        setPosts([newPost, ...posts])
    };
    const deletePost = (delPost) => {
        setPosts(posts.filter(post => post.id !== delPost.id))
    }

    return (
        <div className="App">
            <h1>Новости</h1>
            <PostForm addPost={addPost}/>
            <SearchSortForm filter={filter} setFilter={setFilter}/>
            <PostList posts={sortedAndFilteredPosts} deletePost={deletePost}/>
        </div>
    );
}

export default App;
