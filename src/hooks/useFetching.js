/**
 * Хук, который принимает callback()
 * и оборачивает его в другую функцию,
 * но уже с перехватом ошибок (try-catch) и замыканием на новые состояния (useState):
 * 1) ошибки (error) и 2) индикации загрузки (isLoading).
 * Возвращает эту функцию-обертку для последующего запуска в useEffect(),
 * а также состояния error и isLoading.
 *
 * Фактически этот хук - Компонент высшего порядка (Higher-Order Component, HOC).
 */
import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const doFetch = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [doFetch, isLoading, error];
}
