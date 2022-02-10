import React, {useReducer} from 'react';
import MyModal from "./UI/modal/MyModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {userManagerI18n} from "./LoginFormI18n";

function reducer(state, action) {
    switch (action.type) {
        case 'show':
            return {...state, visible: true};
        case 'hide':
            return {...state, visible: false};
        case 'close':
            return {dialog: '', visible: false};
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
 * @param doUserRequest func - action types: [logout, login, register, profile]
 * @param i18n object - titles in locale
 * @returns {JSX.Element}
 * @constructor
 */
const UserManager = ({
                         user,
                         doUserRequest = f => f,
                         i18n = userManagerI18n
                     }) => {
    const [dialogs, dialogsDispatch] = useReducer(reducer, {visible: false, dialog: undefined});

    function handleRequests(data) {
        dialogsDispatch({type: 'close'});
        doUserRequest(data);
    }

    return (
        <div>
            {user
                ? <span>
                    <button onClick={() => dialogsDispatch({type: 'showProfile'})}>{user.username}</button>
                    /
                    <button onClick={() => doUserRequest({type: 'logout'})}>{i18n.logout}</button>
                </span>
                : <span>
                    <button onClick={() => dialogsDispatch({type: 'showLogin'})}>{i18n.login}</button>
                    /
                    <button onClick={() => dialogsDispatch({type: 'showRegister'})}>{i18n.register}</button>
                </span>
            }
            <MyModal
                visible={dialogs.visible}
                setVisible={visible => dialogsDispatch({type: visible ? 'show' : 'close'})}
            >
                {dialogs.dialog === 'login' &&
                    <LoginForm
                        noForgotPassword
                        onLogin={(data) => handleRequests({type: 'login', payload: data})}
                    />}
                {dialogs.dialog === 'register' &&
                    <RegisterForm
                        onRegister={(data) => handleRequests({type: 'register', payload: data})}
                    />}
                {dialogs.dialog === 'profile' &&
                    <div>
                        <h2>{i18n.profile}</h2>
                        <p>Username: {user.username}</p>
                        <p>E-male: {user.email}</p>
                        <p>Created at: {user.createdAt}</p>
                    </div>}
            </MyModal>
        </div>
    );
};

export default UserManager;