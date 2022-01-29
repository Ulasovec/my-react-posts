import {useMemo} from "react";

export const useSortedPosts = (posts, sortBy) => {
    const sortByArray = sortBy.split('.');
    const sortedPosts = useMemo(
        () => sortBy
            ? [...posts].sort((a, b) =>
                    sortByArray.reduce((p, field) => p[field], a)
                        .localeCompare(sortByArray.reduce((p, field) => p[field], b))
                // a[sortBy].localeCompare(b[sortBy])
            )
            : posts,
        [sortBy, posts]
    );
    return sortedPosts;
}

/**
 * Пользовательский хук usePosts() - предназначен для сортировки и поиска в массиве объектов.
 * Хук переиспользуемый, работает с массивом любых объектов.
 * !!! Важно - объекты в массиве не проверяются на наличие полей sortBy и queryField.
 * @param posts array - массив объектов
 * @param sortBy string - поле, используемое для сортировки ('field.subfield.subsubfield')
 * @param query string - текст для поиска в массиве объектов
 * @param queryField string - поле, используемое для поиска ('field.subfield.subsubfield')
 * @returns {unknown[]} - возвращает отсортированную и отфильтрованную копию массива posts
 */
export const usePosts = (posts, sortBy, query, queryField= 'body') => {
    const sortedPosts = useSortedPosts(posts, sortBy);
    const queryFieldArray = queryField.split('.');
    const sortedAndFilteredPosts = useMemo(
        () => sortedPosts.filter(post =>
            queryFieldArray.reduce((p, field) => p[field], post).toLowerCase().includes(query.toLowerCase())
            // post.body.toLowerCase().includes(query.toLowerCase())
        ),
        [query, sortedPosts]
    );
    return sortedAndFilteredPosts;
}