/**
 * Этот хук принимает URI и самостоятельно делает запрос через fetch & useEffect().
 * Callback в useEffect() возвращает функцию, которая выполняет очистку data & error при смене URI.
 * Важно!!! Функция fetch выбрасывает исключение только при сетевых проблемах,
 * но не по ошибкам типа 404. Для получения кода ошибки следует воспользоваться response.status.
 */
import {useEffect, useState} from "react";

export function useFetch(uri) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!uri) return;
        setIsLoading(true);
        fetch(uri)
            .then(response => {
                if (!response.ok) throw new Error(`Request Error! Response code: ${response.status}`);
                return response;
            })
            .then(data => data.json())
            .then(setData)
            .finally(() => setIsLoading(false))
            .catch(err => setError(err.message));
        return function cleanup() {
            setError(undefined);
            setData(undefined);
        }
    }, [uri]);

    return {
        data,
        error,
        isLoading
    }
}