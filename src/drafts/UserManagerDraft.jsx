import React, {useEffect, useReducer, useState} from 'react';
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

/**
 *
 * @param user object - undefined or userInfo (useQueryMe().data)
 * @param status string - [success, loading, error, idle] or undefined
 * @param errorMessage string - Error message or undefined
 * @param doUserRequest func - action types: [logout, clear, login, register, profile]
 * @returns {JSX.Element}
 * @constructor
 */
const UserManagerDraft = ({user, status, errorMessage, doUserRequest = f => f}) => {
    const [dialogs, dialogsDispatch] = useReducer(reducer, {visible: false, dialog: undefined});

    useEffect(() => {
        if(status === 'success') dialogsDispatch({type: 'hide'});
    }, [status]);

    useEffect(() => {
        doUserRequest({type: 'clear'});
    }, [dialogs]);

    return (
        <div>
            {user
                ? <span>
                    <button onClick={() => dialogsDispatch({type: 'showProfile'})}>{user.name}</button>
                    /
                    <button onClick={() => doUserRequest({type: 'logout'})}>Logout</button>
                </span>
                : <span>
                    <button onClick={() => dialogsDispatch({type: 'showLogin'})}>Login</button>
                    /
                    <button onClick={() => dialogsDispatch({type: 'showRegister'})}>Register</button>
                </span>
            }
            <MyModal
                visible={dialogs.visible}
                setVisible={visible => dialogsDispatch({type: visible ? 'show' : 'hide'})}
            >
                {dialogs.dialog === 'login' &&
                    <LoginForm
                        isError={status === 'error'}
                        errorMessage={errorMessage}
                        disabled={status === 'loading'}
                        noForgotPassword
                        onLogin={(data) => doUserRequest({type: 'login', payload: data})}
                    />}
                {dialogs.dialog === 'register' &&
                    <RegisterForm
                        isError={status === 'error'}
                        errorMessage={errorMessage}
                        disabled={status === 'loading'}
                        onRegister={(data) => doUserRequest({type: 'register', payload: data})}
                    />}
                {dialogs.dialog === 'profile' &&
                    <div>
                        Profile
                    </div>}
            </MyModal>
        </div>
    );
};

export default UserManagerDraft;