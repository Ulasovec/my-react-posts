import React, {useState} from 'react';
import './PostForm.css';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

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
                <MyInput type="text" placeholder="Заголовок..." value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <textarea rows="3" placeholder="Текст поста..." value={body}
                       onChange={event => setBody(event.target.value)}/>
                <div>
                    <MyButton disabled={!title || !body} type="submit">Add Post</MyButton>
                </div>

            </form>
        </div>

    );
};

export default PostForm;