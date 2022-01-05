import './App.css';
import {useState} from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

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
            <h2>Search and Sort</h2>
            <PostList posts={posts}/>
        </div>
    );
}

export default App;
