import React from 'react';
import {useParams} from "react-router-dom";
import Articles from "../components/Articles";
import PostSearchSort from "../components/PostSearchSort";

export function About() {
    return (
        <div>
            About
        </div>
    );
};

export function Contacts() {
    return (
        <div>
            Contacts
        </div>
    );
};

export function DemosIndexPage() {
    return (
        <div>
            Demos Index Page
        </div>
    );
}

export function ArticlesPage() {
    return (
        <div>
            <h2>Демонстрация CRUD - Articles</h2>
            <Articles/>
        </div>
    );
}

export function ArticlePage() {
    const {articleId} = useParams();
    return (
        <div>
            Article Page ID: {articleId}
        </div>
    );
}

export function SearchSortPage() {
    return (
        <div>
            <h2>Sort and Search Page</h2>
            <PostSearchSort/>
        </div>
    );
}
