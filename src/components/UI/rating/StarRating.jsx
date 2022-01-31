import React, {useState} from "react";
import Star from "./Star";
import {createArray} from "./lib";

export default function StarRating({
                                       style = {},
                                       totalStars = 5,
                                       rating = 0,
                                       onChange = f => f,
                                       ...props
                                   }) {
    const [selectedStars, setSelectedStars] = useState(rating ?? 0);
    return (
        <div style={{padding: 5, ...style}} {...props}>
            {createArray(totalStars).map((n, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => {
                        setSelectedStars(i + 1);
                        onChange(i + 1);
                    }}
                />
            ))}
            <p>
                {selectedStars} of {totalStars} stars
            </p>
        </div>
    );
}
