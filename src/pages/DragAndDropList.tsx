// 加上button 去移動當前的div
import React, { useState } from "react";
import { AddButton } from "./component/AddButon";
import { RemoveButton } from "./component/RemoveButton";
import uuid from "react-uuid";
import { NavLink } from "react-router-dom";

type Item = {
    id: string;
    text: string;
};

const DragAndDropList = () => {
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

    // 這個state是用來記錄被拖動的元素的索引值
    const [draggedIndex, setDraggedIndex] = useState<number>(-1);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        // 將被拖動的元素的索引存在state中
        setDraggedIndex(index);

        // 设置数据传输格式: 索引值
        event.dataTransfer.setData("text/plain", `${index}`);
    }


    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        // 設置拖曳的目標可以放置
        event.preventDefault();
    }

    // 新增拖移功能
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        // 取消預設拖動事件
        event.preventDefault();

        const toIndex = index;
        const fromIndex = draggedIndex;

        if (fromIndex === toIndex) return;

        // 移動目標元素至指定位置
        moveItem(fromIndex, toIndex);

        // 清空 draggedIndex
        setDraggedIndex(-1);
    }

    // 移除當前的item
    const handleRemoveItemClick = (index: number) => () => {
        // 把非當前的item過濾出來
        setItems(prevState => prevState.filter((_, i) => i !== index));
        setItemIndexes(prevState => prevState.filter((_, i) => i !== index));
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
                // 增加 draggable 屬性，讓元素可以被拖動
                <div key={uuid()} className="border padding flex center" draggable="true"
                    // 綁定事件
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDrop(event, index)}>
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
                    <button onClick={handleRemoveItemClick(index)} className="remove_btn">Remove item</button>

                </div>
            ))}
        </div>
    );
};

export default DragAndDropList;