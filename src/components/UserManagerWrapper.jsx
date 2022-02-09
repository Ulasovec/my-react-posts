import React, {useContext, useEffect} from 'react';
import {useMutation} from "react-query";
import UserManager from "./UserManager";
import {useQueryMe} from "../hooks/useQueryMe";
import axios from "axios";
import {AppContext} from "../App";
import {toast, Toaster} from "react-hot-toast";

const mutationOptions = {
    onError: (error, variables, context) => {
        toast.error(error.message);
        //console.log('User mutation variables: ', JSON.stringify(error));
        //console.log('User mutation variables: ', variables);
    },
}

const UserManagerWrapper = () => {
    const queryMe = useQueryMe();
    const {setJwt} = useContext(AppContext);

    const mutationLogin = useMutation(credentials => {
        return axios.post('http://localhost:1337/api/auth/local', credentials);
    }, {...mutationOptions, onSuccess: (data) => setJwt(data.data.jwt)});
    const mutationRegister = useMutation(credentials => {
        return axios.post('http://localhost:1337/api/auth/local/register', credentials);
    }, {...mutationOptions, onSuccess: (data) => setJwt(data.data.jwt)});
    const mutationProfile = useMutation(data => {
        return axios.post(`http://localhost:1337/api/users/${queryMe.data.data.id}`, data);
    }, mutationOptions);

    function handleRequests({type, payload}) {
        console.log('handleRequests: ', {type, payload});
        if (type === 'login') mutationLogin.mutate(payload);
        else if (type === 'register') mutationRegister.mutate(payload);
        else if (type === 'profile') mutationProfile.mutate(payload);
        else if (type === 'logout') setJwt(undefined);
        else console.log('Nothing to do for action type: ', type);
    }

    return (
        <div>
            <UserManager user={queryMe?.data} doUserRequest={handleRequests} />
            <Toaster position="top-right"/>
        </div>
    );
};

export default UserManagerWrapper;