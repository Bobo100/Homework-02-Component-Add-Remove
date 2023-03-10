
import React, { useState } from 'react';

type Item = {
    id: number;
    text: string;
};

type Props = {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const DragAndDropList: React.FC<Props> = ({ items, setItems }) => {
    const [draggedItem, setDraggedItem] = useState<Item | null>(null);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const index = Number(event.currentTarget.dataset.index);
        setDraggedItem(items[index]);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        if (!draggedItem) return;

        const newItems = [...items];
        const index = items.findIndex(item => item.id === draggedItem.id);

        newItems.splice(index, 1);
        newItems.splice(event.currentTarget.dataset.index ? Number(event.currentTarget.dataset.index) + 1 : items.length, 0, draggedItem);

        setItems(newItems);
        setDraggedItem(null);
    }

    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    data-index={index}
                    draggable
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    style={{ opacity: draggedItem && draggedItem.id === item.id ? 0.5 : 1 }}
                >
                    {item.text}
                </div>
            ))}
        </div>
    )
}
