import React, { useEffect } from "react";
import {useState} from "react";


function Expenses(props) {
    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        props.getFormValue(title, amount);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleAmountChange(e) {
        setAmount(e.target.value);
    }

    useEffect(()=>{
        setTitle(props.title)
    },[props.title])

    useEffect(()=>{
        setAmount(props.amount)
    },[props.amount])
    return (
        <>
        <div>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="name">Title</label>
                        <input type="text" id="title" value={title} onChange={handleTitleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
                    </div>
                    <button type="submit">ADD</button>
                </form>
                </div>
        </>
    );
}

export default Expenses;