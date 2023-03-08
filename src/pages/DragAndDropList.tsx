import React, { useState } from "react";
import { AddButton } from "./component/AddButon";
import { RemoveButton } from "./component/RemoveButton";
import uuid from "react-uuid";
import { NavLink } from "react-router-dom";

// 加上button 去移動當前的div
const DragAndDropList = () => {
    const [count, setCount] = useState(3);

    const handleAddClick = () => {
        setCount(prevState => prevState + 1);
    };

    const handleRemoveClick = () => {
        setCount(prevState => {
            if (prevState > 0) {
                return prevState - 1;
            }
            return prevState;
        });
    };

    const handleMoveUpClick = () => {
        console.log("Move Up");
    };

    const handleMoveDownClick = () => {
        console.log("Move Down");
    };

    return (
        <div className="page_styles">
            <AddButton onClick={handleAddClick} />
            <RemoveButton onClick={handleRemoveClick} />
            <NavLink to="/" className="link">
                回到Home
            </NavLink>

            {Array.from({ length: count }, (_, index) => (
                <div key={uuid()} className="border padding flex center">
                    <div>Option {index + 1}</div>
                    <button onClick={handleMoveUpClick}>Move Up</button>
                    <button onClick={handleMoveDownClick}>Move Down</button>
                </div>
            ))}
        </div>
    );
};

export default DragAndDropList;