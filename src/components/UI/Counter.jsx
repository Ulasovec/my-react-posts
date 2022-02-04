import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../../app/features/counter/counterSlice";

const Counter = () => {
   const count = useSelector((state)=> state.counter.value);
   const dispatch = useDispatch();

    return (
        <div>
             <h2>{count}</h2>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
        </div>
    );
};

export default Counter;