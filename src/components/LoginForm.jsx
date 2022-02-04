import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";
import classes from './LoginForm.module.css';

const LoginForm = ({title, description, noForgotPassword, errorMessage, disabled, onLogin, onForgotPassword}) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        mode: "onChange"
    });
    const onSubmit = data => {
        console.log('Result: ', data);
        onLogin(data);
    }

    //console.log(watch('password')); // watch input value by passing the name of it

    return (
        <div className={classes.loginForm}>

            {/*"handleSubmit" will validate your inputs before invoking "onSubmit"*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className={classes.h1}>{title}</h1>
                <div className={classes.description}>{description}</div>
                <div className={classes.errorMessage}>{errorMessage}</div>
                {/* register your input into the hook by invoking the "register" function */}
                <label htmlFor="login">Login</label>
                <input type="text" placeholder="user@example.com" {...register("login", {
                    required: 'Login is required',
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address"
                    },
                })} />
                {errors.login && <p>{errors.login.message}</p>}

                <label htmlFor="password">Password</label>
                {/* include validation with required or other standard HTML validation rules */}
                <input type="password" {...register("password", {
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Minimum 8 characters '
                    },
                    validate: true
                })} />
                {/* errors will return when field validation fails  */}
                {errors.password && <p>{errors.password.message}</p>}
                <a onClick={() => onForgotPassword(errors)}>Fogot password?</a>
                <input disabled={disabled} type="submit" value="Login"/>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    noForgotPassword: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
    onLogin: PropTypes.func,
    onForgotPassword: PropTypes.func
};

LoginForm.defaultProps = {
    title: 'Login',
    description: 'Enter your login and password',
    onLogin: f => f,
    onForgotPassword: f => console.log('Forgot password: ', f),
};

export default LoginForm;