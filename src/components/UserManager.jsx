import React, {useReducer, useState} from 'react';
import MyModal from "./UI/modal/MyModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function reducer(state, action) {
    switch (action.type) {
        case 'show':
            return {...state, visible: true};
        case 'hide':
            return {...state, visible: false};
        case 'showLogin':
            return {visible: true, dialog: 'login'};
        case 'showRegister':
            return {visible: true, dialog: 'register'};
        case 'showProfile':
            return {visible: true, dialog: 'profile'};
        default:
            return state;
    }
}

const UserManager = ({user, errorMessage, doRequest = f => f}) => {
    const [dialogs, dialogsDispatch] = useReducer(reducer, {visible: false, dialog: undefined});

    return (
        <div>
            {user
                ? <span>
                    <button onClick={() => dialogsDispatch({type: 'showProfile'})}>{user.name}</button>
                    /
                    <button onClick={() => doRequest({action: 'logout'})}>Logout</button>
                </span>
                : <span>
                    <button onClick={() => dialogsDispatch({type: 'showLogin'})}>Login</button>
                    /
                    <button onClick={() => dialogsDispatch({type: 'showRegister'})}>Register</button>
                </span>
            }
            <MyModal visible={dialogs.visible}
                     setVisible={visible => dialogsDispatch({type: visible ? 'show' : 'hide'})}>
                {dialogs.dialog === 'login' && <LoginForm/>}
                {dialogs.dialog === 'register' && <RegisterForm/>}
                {dialogs.dialog === 'profile' && <div>Profile</div>}
            </MyModal>
        </div>
    );
};

export default UserManager;