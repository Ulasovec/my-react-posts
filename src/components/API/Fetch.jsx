/**
 * Компонент Fetch - для загрузки данных по URI и последующего их рендера
 * с помощью принимаемой функции renderSuccess.
 * Использует хук useFetch().
 */
import React from 'react';
import {useFetch} from "../../hooks/useFetch";

function Fetch({
                   uri,
                   renderSuccess,
                   loadingFallback = <p>Loading...</p>,
                   renderError = error => (<pre>{error}</pre>)
               }) {
    const {data, error, isLoading} = useFetch(uri);
    console.log({data, error, isLoading});
    if (isLoading) return loadingFallback;
    if (error) return renderError(error);
    if (data) return renderSuccess(data);


    return (
        <>
            <p>Nothing to render !!!</p>
        </>
    )
}

export default Fetch;