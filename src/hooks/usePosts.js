import {useMemo} from "react";

export const useSortedPosts = (posts, sortBy) => {
    const sortedPosts = useMemo(
        () => sortBy
            ? [...posts].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
            : posts,
        [sortBy, posts]
    );
    return sortedPosts;
}

export const usePosts = (posts, sortBy, query) => {
    const sortedPosts = useSortedPosts(posts, sortBy);
    const sortedAndFilteredPosts = useMemo(
        () => sortedPosts.filter(post => post.body.toLowerCase().includes(query.toLowerCase())),
        [query, sortedPosts]
    );
    return sortedAndFilteredPosts;
}