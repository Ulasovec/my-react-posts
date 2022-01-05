import './App.css';
import {useState} from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import SearchSortForm from "./components/SearchSortForm";

function App() {
    const [posts, setPosts] = useState([{id: 1, title: 'First post', body: 'Body of post'}]);
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
            <SearchSortForm />
            <PostList posts={posts} deletePost={deletePost}/>
        </div>
    );
}

export default App;
