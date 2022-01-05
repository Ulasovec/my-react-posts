import React, {useState} from 'react';
import './PostForm.css';

const PostForm = ({addPost}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const id = new Date().getTime();
        addPost({ id, title, body });
        setTitle('');
        setBody('');
    }

    return (
        <div className="postForm">
            <h2>Добавить новость</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Заголовок..." value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <textarea rows="3" placeholder="Текст поста..." value={body}
                       onChange={event => setBody(event.target.value)}/>
                <button disabled={!title || !body} type="submit">Add Post</button>
            </form>
        </div>

    );
};

export default PostForm;