import React, {useContext} from "react";
import {useState} from "react";
import {admin} from "../../Data/Data";
import {Contexst} from "../../Contexst/Contexst";
import {useNavigate} from "react-router-dom";
import MyButton from "../../components/UI/button/MyButton";

export default function LoginForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [admins,setAdmins]=useContext(Contexst)
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            name:name,
            password:password,
        };
        const id = admin.filter(item=> item.name && item.password === obj.name && obj.password);
        if (admin.filter(item=> item.name && item.password === obj.name && obj.password).join('')) {
           setAdmins({id:id[0].id ,isAdmin:true, name:'name'});
           navigate(`/Admins/${id[0].id}`);

        }
        else {

            setPassword("");
            setName("");
        }

    };
    return (
        <form onSubmit={handleSubmit} className="form" >
            <div className="form__name">
                <label htmlFor='name'>Имя</label>
                <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form__password">
                <label htmlFor='password'>Пароль</label>
                <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <MyButton type={"submit"} >Отправить</MyButton>
        </form>
    );
}