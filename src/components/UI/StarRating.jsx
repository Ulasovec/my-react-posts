import React, {useContext, useEffect} from 'react';
import { useState } from "react";
import Star from "./Star";
import {Contexst} from "../../Contexst/Contexst";



export const createArray = length => [...Array(length)];


    export default function StarRating({ style = {}, totalStars = 10,...props }) {

        const [selectedStars, setSelectedStars] = useState(0);
        const [select,setSelect]= useContext(Contexst);
        const id = props.id

        useEffect(()=> setSelect(selectedStars) ,[selectedStars])

        console.log('Рейтинг',select);
        console.log('Индификатор',id);

        return (
            <div style={{ padding: 5, ...style }} {...props}>
                {!selectedStars ? createArray(totalStars).map((n, i) => (
                    <Star
                        key={i}
                        selected={selectedStars > i}
                        onSelect={() => setSelectedStars(i + 1)}
                    />
                )): <div> Спасибо за отзыв </div> }
                <p>
                    {selectedStars} of {totalStars} stars
                </p>
            </div>
        );
    }
