import { useState } from 'react';
import { AddButton } from './component/AddButon';
import { RemoveButton } from './component/RemoveButton';
import uuid from 'react-uuid';
import "./css/Home.css"
export const Home = () => {
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
    return (
        <div className='home'>
            <AddButton onClick={handleAddClick} />
            <RemoveButton onClick={handleRemoveClick} />
            {Array.from({ length: count }, (_, index) => (
                <div key={uuid()} className="border">Option {index + 1}</div>
            ))}
        </div>
    );
};
