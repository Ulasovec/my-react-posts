import React, {useReducer, useState} from 'react';
import MyButton from "../../components/UI/button/MyButton";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

const RegAdminsForm = () => {
    const queryClient = useQueryClient();
const [newAdmins,setNewAdmins]=useReducer((newAdmins,action)=>({...newAdmins,...action}),
    {
            username:'',
            password:'',
            email: '',
    })
    const mutation = useMutation(postAdmins, {
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
    function postAdmins(newAdmins) {
        return axios.post(' http://localhost:1337/api/auth/local/register', newAdmins);
    }
    function postAdmin(e){
        e.preventDefault();
        console.log(newAdmins);
        mutation.mutate(newAdmins);
        setNewAdmins({
            username:'',
            password:'',
            email: '',
        });
    }
    return (
        <div>
            <form className="form" onSubmit={postAdmin}>
                <div className="form__name">
                    <label htmlFor='name'>Имя</label>
                    <input type='text' id='name' value={newAdmins.username} onChange={(event)=>setNewAdmins({username:event.target.value})} />
                </div>
                <div className="form__mail">
                    <label htmlFor='mail'>Email</label>
                    <input type='email' id='mail' value={newAdmins.email} onChange={(event)=>setNewAdmins({email:event.target.value})} />
                </div>
                <div className="form__password">
                    <label htmlFor='password'>Пароль</label>
                    <input type='password' id='password' value={newAdmins.password} onChange={(event)=>setNewAdmins({password:event.target.value})} />
                </div>
                <MyButton type={"submit"}>Отправить</MyButton>
            </form>
        </div>
    );
};

export default RegAdminsForm;