import React, { useState } from "react";
import { AddButton } from "./component/AddButon";
import { RemoveButton } from "./component/RemoveButton";
import uuid from "react-uuid";
import { NavLink } from "react-router-dom";

type Item = {
    id: string;
    text: string;
};

export const MoveItemList = () => {
    // 這個state是用來記錄每個item的內容
    const [items, setItems] = useState<Item[]>([
        { id: "1", text: "Option 1" },
        { id: "2", text: "Option 2" },
        { id: "3", text: "Option 3" }
    ]);
    // 這個state是用來記錄每個item的index，並且用來移動item的位置
    const [itemIndexes, setItemIndexes] = useState<number[]>(
        items.map((_, index) => index)
    );

    const moveItem = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;

        // 這裡的newItems和newItemIndexes是為了避免直接修改state
        // 這樣做的好處是可以讓React知道state有變化，並且重新渲染畫面        
        const newItems = [...items];
        const newItemIndexes = [...itemIndexes];

        newItems.splice(toIndex, 0, newItems.splice(fromIndex, 1)[0]);
        newItemIndexes.splice(toIndex, 0, newItemIndexes.splice(fromIndex, 1)[0]);

        // 更新state        
        setItems(newItems);
        setItemIndexes(newItemIndexes);
    };

    const handleAddClick = () => {
        setItems(prevState => [
            ...prevState,
            { id: uuid(), text: `Option ${prevState.length + 1}` }
        ]);

        // 這裡的prevState.length就是新的item的index
        setItemIndexes(prevState => [...prevState, prevState.length]);
    };

    const handleRemoveClick = () => {
        if (items.length === 0) return;
        // 把最後一個item移除
        setItems(prevState => prevState.slice(0, -1));
        setItemIndexes(prevState => prevState.slice(0, -1));
    };

    const handleMoveUpClick = (index: number) => () => {
        const newIndex = index - 1;
        if (newIndex < 0) return;

        moveItem(index, newIndex);
    };

    const handleMoveDownClick = (index: number) => () => {
        const newIndex = index + 1;
        if (newIndex >= items.length) return;

        moveItem(index, newIndex);
    };

    // 每個div都有兩個button去移動當前的div
    // 如果第一個div的button被點擊，則不會有任何反應
    // 如果最後一個div的button被點擊，則不會有任何反應
    return (
        <div className="page_styles">
            <AddButton onClick={handleAddClick} />
            <RemoveButton onClick={handleRemoveClick} />
            <NavLink to="/" className="link">
                回到Home
            </NavLink>


            {items.map((item, index) => (
                <div key={uuid()} className="border padding flex center">
                    <div>{item.text}</div>
                    <button disabled={index === 0} onClick={handleMoveUpClick(index)}>
                        Move Up
                    </button>
                    <button
                        disabled={index === items.length - 1}
                        onClick={handleMoveDownClick(index)}
                    >
                        Move Down
                    </button>
                </div>
            ))}
        </div>
    );
};
