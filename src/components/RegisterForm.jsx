import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";
import classes from './LoginForm.module.css';
import {registerI18n} from "./LoginFormI18n";

/**
 * Компонент с использованием PropTypes & DefaultProps (внизу пример).
 * @param isError bool - Надо ли отображать ошибку при регистрации.
 * @param errorMessage string - Расшифровка ошибки, возникающей при регистрации
 * @param disabled - Сделать кнопку submit неактивной
 * @param onRegister func - callback with { username, email, password } object parameter
 * @param i18n object - Все надписи и сообщения (см. "./LoginFormI18n").
 * @returns {JSX.Element}
 * @constructor
 */

const RegisterForm = ({
                          isError = false,
                          errorMessage,
                          disabled = false,
                          onRegister = f => console.log('onRegister: ', f),
                          i18n = {}
                      }) => {
    // Слияние i18n
    i18n = {...registerI18n, ...i18n};
    // Хук react-hook-form
    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({
        mode: "onChange"
    });
    const onSubmit = data => {
        console.log('Result: ', data);
        onRegister(data);
    }
    //console.log('USERNAME watch: ', watch('username')); // watch input value by passing the name of it

    return (
        <div className={classes.loginForm}>

            {/*"handleSubmit" will validate your inputs before invoking "onSubmit"*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*Заголовок, описание и ошибки*/}
                <h1 className={classes.h1}>{i18n.title}</h1>
                <div className={classes.description}>{i18n.description}</div>
                <div className={classes.errorMessage}>
                    {isError && (errorMessage ?? i18n.errorMessage)}
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <label htmlFor="username">{i18n.username.title}</label>
                <input type="text" {...register('username', {
                    required: i18n.username.required,
                    minLength: {
                        value: 2,
                        message: i18n.username.validation
                    },
                    validate: true
                })} />
                {/* errors will return when field validation fails  */}
                {errors.username && <p>{errors.username.message}</p>}

                {/* register your input into the hook by invoking the "register" function */}
                <label htmlFor="email">{i18n.email.title}</label>
                <input type="text" {...register('email', {
                    required: i18n.email.required,
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: i18n.email.validation
                    },
                })} />
                {/* errors will return when field validation fails  */}
                {errors.email && <p>{errors.email.message}</p>}

                {/* include validation with required or other standard HTML validation rules */}
                <label htmlFor="password">{i18n.password.title}</label>
                <input type="password" {...register('password', {
                    required: i18n.password.required,
                    minLength: {
                        value: 8,
                        message: i18n.password.validation
                    },
                    validate: true
                })} />
                {/* errors will return when field validation fails  */}
                {errors.password && <p>{errors.password.message}</p>}

                <input disabled={disabled || !isValid} type="submit" value={i18n.submit}/>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
    onRegister: PropTypes.func,
    i18n: PropTypes.object
};

/*LoginForm.defaultProps = {
    onRegister: f => console.log('onRegister: ', f),
};*/

export default RegisterForm;