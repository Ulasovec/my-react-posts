import './App.css';
import {useState} from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import SearchSortForm from "./components/SearchSortForm";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
import {usePosts} from "./hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([{id: 1, title: 'First post', body: 'Body of post'}]);
    const [filter, setFilter] = useState({sortBy: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndFilteredPosts = usePosts(posts, filter.sortBy, filter.query);

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
            <MyButton onClick={() => setModal(true)}>Добавить новость</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm addPost={addPost}/>
            </MyModal>
            <SearchSortForm filter={filter} setFilter={setFilter}/>
            <PostList posts={sortedAndFilteredPosts} deletePost={deletePost}/>
        </div>
    );
}

export default App;
