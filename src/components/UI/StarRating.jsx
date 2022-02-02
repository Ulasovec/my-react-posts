import React from 'react';
import {useState} from "react";
import Star from "./Star";

import {useMutation} from "react-query";
import axios from "axios";

export const createArray = length => [...Array(length)];


export default function StarRating({style = {}, totalStars = 10, ...props}) {
    const [selectedStars, setSelectedStars] = useState(props.rating ?? 0);
    const id = props.id

    const mutationMod = useMutation(modifyArticleRating);

    function modifyArticleRating({id, rating}) {
        return axios.put(`http://localhost:1337/api/articles/${id}`,
            {data: {rating: rating}}
        );
    }

    return (
        <div style={{padding: 5, ...style}} {...props}>
            {!selectedStars ? createArray(totalStars).map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => {
                        setSelectedStars(i + 1);
                        mutationMod.mutate({id: id, rating: i + 1})
                    }}
                />
            )) : <div> Спасибо за отзыв </div>}
            <p>
                {selectedStars} of {totalStars} stars
            </p>
        </div>
    );
}
